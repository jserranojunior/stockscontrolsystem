package handlers

import (
	"fmt"
	"net/http"
	"sort"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/back/models"
)

// Estrutura auxiliar para mapear o resultado da busca do Valor Mais Recente
type TickerValorRecente struct {
	TickerID   uint    `gorm:"column:ticker_id"`
	ValorAtual float64 `gorm:"column:valorAtual"`
}

// GetOperacoesAgrupadas agrupa as operações por Corretora e Mês (Apenas Ano Atual),
// e calcula Posição, Investido e Performance.
func GetOperacoesAgrupadas(c *gin.Context) {
	currentYear := time.Now().Format("2006")
	var results []models.OperacaoJoinResult

	// 1. Query para Operações (com filtro de ano e valor na data)
	joinValoresTickers := `
    LEFT JOIN valores_tickers vt2 ON 
    vt2.ticker_id = operacoes.ticker_id AND 
    vt2.data = (
      SELECT MAX(vt_max.data)
      FROM valores_tickers vt_max
      WHERE vt_max.ticker_id = operacoes.ticker_id
        AND DATE(vt_max.data) <= DATE(operacoes.data) 
    )
  `
	selectColumns := "operacoes.*, tickers.tick, tickers.corretora_id, vt2.valorAtual"

	err := DB.Model(&models.Operacoes{}).
		Select(selectColumns).
		Joins("JOIN tickers ON tickers.id = operacoes.ticker_id").
		Joins(joinValoresTickers).
		Where("YEAR(operacoes.data) = ?", currentYear).
		Order("tickers.corretora_id ASC, operacoes.data DESC").
		Find(&results).Error

	if err != nil {
		fmt.Println("Erro (1) ao buscar operações com JOIN:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar operações agrupadas"})
		return
	}

	// 2. Busca de Corretoras e Valores Mais Recentes (2b)
	var corretoras []models.Corretoras
	if err := DB.Find(&corretoras).Error; err != nil {
		fmt.Println("Erro (2) ao buscar corretoras:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar dados das corretoras"})
		return
	}

	corretorasMap := make(map[uint]models.Corretoras)
	allCorretoraIDs := make([]uint, 0, len(corretoras))
	for _, corr := range corretoras {
		corretorasMap[corr.ID] = corr
		allCorretoraIDs = append(allCorretoraIDs, corr.ID)
	}

	var tickersValoresRecentes []TickerValorRecente
	rawQuery := `
    SELECT vt.ticker_id, vt.valorAtual
    FROM valores_tickers vt
    INNER JOIN (
        SELECT ticker_id, MAX(data) as max_data
        FROM valores_tickers
        GROUP BY ticker_id
    ) max_vt ON vt.ticker_id = max_vt.ticker_id AND vt.data = max_vt.max_data
  `
	err = DB.Raw(rawQuery).Scan(&tickersValoresRecentes).Error

	if err != nil {
		fmt.Println("Erro (2b) ao buscar valores mais recentes:", err)
	}

	valorRecenteMap := make(map[uint]float64)
	for _, tv := range tickersValoresRecentes {
		valorRecenteMap[tv.TickerID] = tv.ValorAtual
	}

	// 3. Processamento em Go (Agrupamento, Cálculos e Acúmulo MENSAL)
	agrupamentoTemporario := make(map[uint]map[string]*models.MesAgrupadoDTO)

	for _, result := range results {
		corretoraID := result.CorretoraID

		// Formatação Abreviada (Jan, Fev, etc.) para o campo MesAno
		mesAno := result.Data.Format("Jan")
		// Key para ordenação: "01-Jan", "02-Fev", etc.
		mesAnoKey := result.Data.Format("01-Jan")

		// Lógica de Inicialização do Mês (usando mesAnoKey)
		if _, ok := agrupamentoTemporario[corretoraID]; !ok {
			agrupamentoTemporario[corretoraID] = make(map[string]*models.MesAgrupadoDTO)
		}

		if _, ok := agrupamentoTemporario[corretoraID][mesAnoKey]; !ok {
			agrupamentoTemporario[corretoraID][mesAnoKey] = &models.MesAgrupadoDTO{
				MesAno:          mesAno,
				Operacoes:       []models.OperacaoAgrupadaDTO{},
				TotalOperacoes:  0,
				ResultadoMensal: 0,
				SomaInvestido:   0,
				SomaPosicao:     0,
			}
		}

		mesDTO := agrupamentoTemporario[corretoraID][mesAnoKey]

		// Cálculo condicional de Investido e Posição (Venda = negativo)
		qtdAjustada := result.Quantidade
		if result.TipoOperacao == "V" {
			qtdAjustada = -result.Quantidade
		}

		valorAtualRecente := valorRecenteMap[result.TickerID]
		investido := result.ValorUnidade * qtdAjustada
		posicao := valorAtualRecente * qtdAjustada

		// Mapeamento para o DTO (Não muda)
		opDTO := models.OperacaoAgrupadaDTO{
			ID: result.ID, TipoOperacao: result.TipoOperacao, Data: result.Data,
			Quantidade: result.Quantidade, ValorTotal: result.ValorTotal, ValorUnidade: result.ValorUnidade,
			PrecoMedioCompra: result.PrecoMedioCompra, SaldoTickers: result.SaldoTickers, Carteira: result.Carteira,
			Resultado: result.Resultado, Lp: result.Lp, Tick: result.Tick, ValorAtual: result.ValorAtual,
			ValorAtualRecente: valorAtualRecente, Investido: investido, Posicao: posicao,
		}

		// Acúmulos MENSAIS
		mesDTO.Operacoes = append(mesDTO.Operacoes, opDTO)
		mesDTO.TotalOperacoes += opDTO.ValorTotal
		mesDTO.ResultadoMensal += opDTO.Resultado
		mesDTO.SomaInvestido += investido
		mesDTO.SomaPosicao += posicao
	}

	// 4. Montar a Estrutura Final (Cálculos de Performance e Acúmulo TOTAL)
	var finalResult []models.CorretoraAgrupadaDTO

	sort.Slice(allCorretoraIDs, func(i, j int) bool { return allCorretoraIDs[i] < allCorretoraIDs[j] })

	for _, corrID := range allCorretoraIDs {
		corretoraData := corretorasMap[corrID]
		mesesMap := agrupamentoTemporario[corrID]

		corretoraDTO := models.CorretoraAgrupadaDTO{
			ID: corrID, Nome: corretoraData.Nome, Cor: corretoraData.Cor, Disponivel: corretoraData.Disponivel,
			TotalGeral: 0, ResultadoGeral: 0, TotalInvestido: 0, TotalPosicao: 0,
			TotalPerformance: 0, TotalVariavel: 0, // Inicializado
			Meses: []models.MesAgrupadoDTO{},
		}

		if mesesMap != nil {
			mesesKeys := make([]string, 0, len(mesesMap))
			for key := range mesesMap {
				mesesKeys = append(mesesKeys, key)
			}
			sort.Strings(mesesKeys) // Ordenação: Janeiro -> Dezembro

			for _, mesAnoKey := range mesesKeys {
				mesDTO := *mesesMap[mesAnoKey]

				// --- CÁLCULO MENSAL PERFORMANCE E VARIAVEL ---
				// Performance (Ganho absoluto)
				mesDTO.Performance = mesDTO.SomaPosicao - mesDTO.SomaInvestido

				// Variavel (Ganho percentual)
				if mesDTO.SomaInvestido != 0 {
					mesDTO.Variavel = (mesDTO.Performance / mesDTO.SomaInvestido) * 100
				} else {
					mesDTO.Variavel = 0.0 // Evita divisão por zero
				}
				// ---------------------------------------------

				// Acúmulos TOTAIS (Corretora)
				corretoraDTO.TotalGeral += mesDTO.TotalOperacoes
				corretoraDTO.ResultadoGeral += mesDTO.ResultadoMensal
				corretoraDTO.TotalInvestido += mesDTO.SomaInvestido
				corretoraDTO.TotalPosicao += mesDTO.SomaPosicao

				corretoraDTO.Meses = append(corretoraDTO.Meses, mesDTO)
			}
		}

		// --- CÁLCULO TOTAL PERFORMANCE E VARIAVEL ---
		// TotalPerformance
		corretoraDTO.TotalPerformance = corretoraDTO.TotalPosicao - corretoraDTO.TotalInvestido

		// TotalVariavel
		if corretoraDTO.TotalInvestido != 0 {
			corretoraDTO.TotalVariavel = (corretoraDTO.TotalPerformance / corretoraDTO.TotalInvestido) * 100
		} else {
			corretoraDTO.TotalVariavel = 0.0
		}
		// -------------------------------------------

		finalResult = append(finalResult, corretoraDTO)
	}

	c.JSON(http.StatusOK, finalResult)
}
