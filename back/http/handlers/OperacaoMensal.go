package handlers

import (
	"fmt"
	"math"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// ----------------------------------------------------------------------
// Tipos
// ----------------------------------------------------------------------
type Corretora struct {
	ID         uint    `json:"id"`
	Nome       string  `json:"nome"`
	Cor        string  `json:"cor"`
	Disponivel float64 `json:"disponivel"`
}

type OperacaoAux struct {
	Data          time.Time
	TipoOperacao  string
	Quantidade    float64
	ValorTotal    float64
	TickerID      uint
	PrecoAtual    float64
	CorretoraID   uint
	CorretoraNome string
	CorretoraCor  string
	Carteira      float64
	Posicao       float64
}

type EstadoCorretora struct {
	TotalQuantidade map[uint]float64
	CustoMedio      map[uint]float64
	UltimoPreco     map[uint]float64
	PosicaoAnterior float64
}

// Estrutura de totais diários
type TotaisDia struct {
	Data          string  `json:"data"`
	PosicaoDia    float64 `json:"posicao_dia"`
	VariacaoDia   float64 `json:"variacao_dia"`
	Disponivel    float64 `json:"disponivel"`
	QuantidadeDia float64 `json:"quantidade_dia"`
	ValorAtual    float64 `json:"valorAtual"`
	InvestidoDia  float64 `json:"investido_dia"`
}

// Estrutura de saída do dia, com totais e lista de operações
type DiaResultado struct {
	Totais    TotaisDia     `json:"totais"`
	Operacoes []OperacaoAux `json:"operacoes"`
}

// ----------------------------------------------------------------------
// Função principal
// ----------------------------------------------------------------------
func GetOperacoesMesAtual(c *gin.Context) {
	periodo := ObterPeriodoMesAtual()

	// Define o período do mês anterior
	primeiroDiaMesAnterior := periodo.Inicio.AddDate(0, -1, 0)
	ultimoDiaMesAnterior := periodo.Inicio.AddDate(0, 0, -1)

	todasCorretoras, operacoesMes, err := fetchDados(periodo.Inicio, periodo.Fim)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Busque todas as operações do mês anterior, do primeiro ao último dia
	_, operacoesAnterior, err := fetchDados(primeiroDiaMesAnterior, ultimoDiaMesAnterior)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	operacoesPorCorretora := organizarOperacoes(operacoesMes)
	operacoesPorCorretoraAnterior := organizarOperacoes(operacoesAnterior)

	resultado := processarCorretoras(todasCorretoras, operacoesPorCorretora, operacoesPorCorretoraAnterior)

	c.JSON(http.StatusOK, gin.H{"corretoras": resultado})
}

// ----------------------------------------------------------------------
// Funções de processamento
// ----------------------------------------------------------------------

// Processa todas as corretoras
func processarCorretoras(
	corretoras []Corretora,
	operacoes map[uint][]OperacaoAux,
	operacoesAnterior map[uint][]OperacaoAux,
) []gin.H {

	var resultado []gin.H
	semanasMes := GerarSemanasMesAtual()

	for _, corretora := range corretoras {
		estado := &EstadoCorretora{
			TotalQuantidade: make(map[uint]float64),
			CustoMedio:      make(map[uint]float64),
			UltimoPreco:     make(map[uint]float64),
			PosicaoAnterior: 0.0,
		}

		semanas := processarSemanaZero(corretora, estado, operacoesAnterior)
		semanas = processarSemanasMesAtual(corretora, estado, operacoes, semanas, semanasMes)
		semanasOrdenadas := OrdenarSemanas(semanas)

		resultado = append(resultado, gin.H{
			"corretora_id":   corretora.ID,
			"corretora_nome": corretora.Nome,
			"corretora_cor":  corretora.Cor,
			"semanas":        semanasOrdenadas,
		})
	}

	return resultado
}

// Processa a semana 0 (último dia do mês anterior)
func processarSemanaZero(
	corretora Corretora,
	estado *EstadoCorretora,
	operacoesAnterior map[uint][]OperacaoAux,
) map[int]gin.H {

	semanas := make(map[int]gin.H)

	ultimoDiaAnterior := ObterUltimoDiaMesAnterior()
	for isFimDeSemana(ultimoDiaAnterior) {
		ultimoDiaAnterior = ultimoDiaAnterior.AddDate(0, 0, -1)
	}

	if opsAnt, exists := operacoesAnterior[corretora.ID]; exists && len(opsAnt) > 0 {
		for _, op := range opsAnt {
			processarOperacao(op, estado)
		}
	}

	posicaoTotalCarteira, _, quantidadeDia := calcularTotaisDia(estado)

	estado.PosicaoAnterior = posicaoTotalCarteira

	// O valor do campo investido_dia é 0 para o dia do mês anterior
	investidoDia := 0.0

	semanas[0] = gin.H{
		"semana": 0,
		"dias": []DiaResultado{
			criarDiaResultado(
				ultimoDiaAnterior,
				posicaoTotalCarteira,
				0.0, // Variação do dia
				corretora.Disponivel,
				quantidadeDia,
				[]OperacaoAux{}, // Lista de operações
				0.0,             // Posição das operações do dia (0.0 para a semana zero)
				investidoDia,
			),
		},
	}

	return semanas
}

// Processa as semanas do mês atual (semanas 1+)
func processarSemanasMesAtual(
	corretora Corretora,
	estado *EstadoCorretora,
	operacoes map[uint][]OperacaoAux,
	semanas map[int]gin.H,
	semanasMes []Semana,
) map[int]gin.H {

	operacoesPorData := indexarOperacoesPorData(operacoes[corretora.ID])

	for _, semana := range semanasMes {
		if semana.Numero == 0 {
			continue
		}

		diasMesAtual := FiltrarDiasMesAtual(semana.Dias)

		semanas[semana.Numero] = gin.H{
			"semana": semana.Numero,
			"dias":   processarDiasSemana(diasMesAtual, estado, operacoesPorData, corretora),
		}
	}

	return semanas
}

// Processa os dias de uma semana específica
func processarDiasSemana(
	dias []string,
	estado *EstadoCorretora,
	operacoesPorData map[string][]OperacaoAux,
	corretora Corretora,
) []DiaResultado {

	var diasArray []DiaResultado

	for _, dataStr := range dias {
		dia, _ := time.Parse("2006-01-02", dataStr)
		posicaoAnterior := estado.PosicaoAnterior

		operacoesDia := operacoesPorData[dataStr]

		posicaoDia := 0.0
		investidoDia := 0.0
		if len(operacoesDia) > 0 {
			for i, op := range operacoesDia {
				// Altera a posicao para negativa se for uma venda
				if op.TipoOperacao == "V" {
					operacoesDia[i].Posicao = -op.Posicao
					operacoesDia[i].ValorTotal = -op.ValorTotal
				}

				// Soma o valor total (agora negativo para vendas)
				investidoDia += operacoesDia[i].ValorTotal

				// Processa a operação com o estado
				processarOperacao(op, estado)
				posicaoDia += operacoesDia[i].Posicao

				// Adiciona arredondamento aos campos da operação
				operacoesDia[i].ValorTotal = roundFloat(operacoesDia[i].ValorTotal)
				operacoesDia[i].Posicao = roundFloat(operacoesDia[i].Posicao)
			}
		}

		posicaoTotalCarteira, _, quantidadeDia := calcularTotaisDia(estado)
		variacaoDia := posicaoTotalCarteira - posicaoAnterior

		diasArray = append(diasArray, criarDiaResultado(
			dia,
			posicaoTotalCarteira,
			variacaoDia,
			corretora.Disponivel,
			quantidadeDia,
			operacoesDia,
			posicaoDia,
			investidoDia,
		))

		estado.PosicaoAnterior = posicaoTotalCarteira
	}

	return diasArray
}

// Processa uma operação individual (compra ou venda)
func processarOperacao(op OperacaoAux, estado *EstadoCorretora) {
	if op.TipoOperacao == "C" {
		totalValorAnterior := estado.TotalQuantidade[op.TickerID] * estado.CustoMedio[op.TickerID]
		novoTotalQuantidade := estado.TotalQuantidade[op.TickerID] + op.Quantidade

		if novoTotalQuantidade > 0 {
			estado.CustoMedio[op.TickerID] = (totalValorAnterior + op.ValorTotal) / novoTotalQuantidade
		} else {
			estado.CustoMedio[op.TickerID] = 0
		}
		estado.TotalQuantidade[op.TickerID] = novoTotalQuantidade

	} else if op.TipoOperacao == "V" {
		estado.TotalQuantidade[op.TickerID] -= op.Quantidade
		if estado.TotalQuantidade[op.TickerID] == 0 {
			delete(estado.CustoMedio, op.TickerID)
		}
	}

	estado.UltimoPreco[op.TickerID] = op.PrecoAtual
}

// Calcula totais do dia (posição, investido e quantidade total)
func calcularTotaisDia(estado *EstadoCorretora) (float64, float64, float64) {
	posicaoDia := 0.0
	investidoDia := 0.0
	quantidadeDia := 0.0

	for tickerID, totalQuantidade := range estado.TotalQuantidade {
		posicaoDia += totalQuantidade * estado.UltimoPreco[tickerID]
		investidoDia += totalQuantidade * estado.CustoMedio[tickerID]
		// Apenas adiciona saldos positivos para representar a quantidade de ações compradas
		if totalQuantidade > 0 {
			quantidadeDia += totalQuantidade
		}
	}

	return posicaoDia, investidoDia, quantidadeDia
}

// Cria a estrutura de resultado para um dia
func criarDiaResultado(
	data time.Time,
	posicaoTotalCarteira float64,
	variacaoDia float64,
	disponivel float64,
	quantidadeDia float64,
	operacoes []OperacaoAux,
	posicaoDia float64,
	investidoDia float64,
) DiaResultado {

	return DiaResultado{
		Totais: TotaisDia{
			Data:          data.Format("2006-01-02"),
			PosicaoDia:    roundFloat(posicaoDia),
			InvestidoDia:  roundFloat(investidoDia),
			VariacaoDia:   roundFloat(variacaoDia),
			Disponivel:    roundFloat(disponivel),
			QuantidadeDia: roundFloat(quantidadeDia),
			ValorAtual:    roundFloat(posicaoTotalCarteira),
		},
		Operacoes: operacoes,
	}
}

// Indexa operações por data para acesso rápido
func indexarOperacoesPorData(operacoes []OperacaoAux) map[string][]OperacaoAux {
	operacoesPorData := make(map[string][]OperacaoAux)
	for _, op := range operacoes {
		dataStr := op.Data.Format("2006-01-02")
		operacoesPorData[dataStr] = append(operacoesPorData[dataStr], op)
	}
	return operacoesPorData
}

// ----------------------------------------------------------------------
// Funções de acesso ao banco de dados
// ----------------------------------------------------------------------

// Busca dados de corretoras e operações
func fetchDados(inicio, fim time.Time) ([]Corretora, []OperacaoAux, error) {
	var corretoras []Corretora
	err := DB.Table("corretoras").
		Select("id, nome, cor, disponivel").
		Order("id ASC").
		Scan(&corretoras).Error
	if err != nil {
		return nil, nil, fmt.Errorf("Erro ao buscar corretoras: %v", err)
	}

	var operacoes []OperacaoAux
	err = DB.Table("operacoes o").
		Select(`
			o.data,
			o.tipo_operacao,
			o.quantidade,
			o.valor_total,
			o.ticker_id,
			o.carteira,
			c.id as corretora_id,
			c.nome as corretora_nome,
			c.cor as corretora_cor,
			t.preco_atual,
			(o.quantidade * t.preco_atual) AS posicao
		`).
		Joins("JOIN tickers t ON t.id = o.ticker_id").
		Joins("JOIN corretoras c ON c.id = t.corretora_id").
		Where("o.data BETWEEN ? AND ?", inicio, fim).
		Order("c.nome, o.data ASC").
		Scan(&operacoes).Error
	if err != nil {
		return nil, nil, fmt.Errorf("Erro ao buscar operações: %v", err)
	}

	return corretoras, operacoes, nil
}

// Agrupa operações por corretora
func organizarOperacoes(operacoes []OperacaoAux) map[uint][]OperacaoAux {
	result := make(map[uint][]OperacaoAux)
	for _, op := range operacoes {
		result[op.CorretoraID] = append(result[op.CorretoraID], op)
	}
	return result
}

// Função utilitária para arredondar um float para duas casas decimais
func roundFloat(val float64) float64 {
	ratio := math.Pow(10, float64(2))
	return math.Round(val*ratio) / ratio
}
