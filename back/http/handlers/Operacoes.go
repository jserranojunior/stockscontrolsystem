package handlers

import (
	"fmt"
	"net/http"
	"sort"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/back/models"
	"gorm.io/gorm"
)

func UpdateOperacao(c *gin.Context) {
	var input models.Operacoes

	// Bind do JSON recebido
	if err := c.ShouldBindJSON(&input); err != nil {
		fmt.Println("Erro ao bind JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verifica se ID foi enviado
	if input.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID da operação é obrigatório"})
		return
	}

	var operacao models.Operacoes
	if err := DB.First(&operacao, input.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Operação não encontrada"})
		return
	}

	// Atualiza os campos
	operacao.TickerID = input.TickerID
	operacao.TipoOperacao = input.TipoOperacao
	operacao.Data = input.Data
	operacao.Quantidade = input.Quantidade
	operacao.ValorTotal = input.ValorTotal
	operacao.ValorUnidade = input.ValorUnidade
	operacao.PrecoMedioCompra = input.PrecoMedioCompra
	operacao.SaldoTickers = input.SaldoTickers
	operacao.Carteira = input.Carteira
	operacao.Lp = input.Lp
	operacao.Resultado = input.Resultado

	if err := DB.Save(&operacao).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar operação"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Operação atualizada com sucesso!",
		"data":    operacao,
	})
}

// CreateOperacao cria uma nova operação
func CreateOperacao(c *gin.Context) {
	var operacao models.Operacoes

	// Bind do JSON para a struct Operacoes
	if err := c.ShouldBindJSON(&operacao); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos: " + err.Error()})
		return
	}

	// Validar tipo de operação
	if operacao.TipoOperacao != "C" && operacao.TipoOperacao != "V" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tipo de operação deve ser 'C' (compra) ou 'V' (venda)"})
		return
	}

	// Verificar se o ticker existe
	var ticker models.Tickers
	if err := DB.First(&ticker, operacao.TickerID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Ticker não encontrado"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Calcular campos automáticos se necessário
	if operacao.ValorUnidade == 0 && operacao.ValorTotal > 0 && operacao.Quantidade > 0 {
		operacao.ValorUnidade = operacao.ValorTotal / operacao.Quantidade
	}

	if operacao.ValorTotal == 0 && operacao.ValorUnidade > 0 && operacao.Quantidade > 0 {
		operacao.ValorTotal = operacao.ValorUnidade * operacao.Quantidade
	}

	// Criar a operação no banco
	if err := DB.Create(&operacao).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar operação: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":  "Operação criada com sucesso",
		"operacao": operacao,
	})
}

func GetOperacaoByID(c *gin.Context) {
	id := c.Param("id")
	var operacao models.Operacoes

	if err := DB.Preload("Ticker").First(&operacao, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Operação não encontrada"})
		return
	}

	c.JSON(http.StatusOK, operacao)
}

/* GetOperacoesPorSemanaEMes
 */

func DeleteOperacao(c *gin.Context) {
	id := c.Param("id")
	var operacao models.Operacoes

	// verifica se existe
	if err := DB.First(&operacao, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Operação não encontrada"})
		return
	}

	// deleta
	if err := DB.Delete(&operacao).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao deletar operação"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Operação deletada com sucesso"})
}

func GetOperacoesMesAtual(c *gin.Context) {
	// Obter data atual
	agora := time.Now()
	inicioMes := time.Date(agora.Year(), agora.Month(), 1, 0, 0, 0, 0, time.UTC)
	fimMes := inicioMes.AddDate(0, 1, -1)

	// Primeiro, buscar TODAS as corretoras
	var todasCorretoras []struct {
		ID         uint    `json:"id"`
		Nome       string  `json:"nome"`
		Cor        string  `json:"cor"`
		Disponivel float64 `json:"disponivel"`
	}

	err := DB.Table("corretoras").
		Select("id, nome, cor").
		Order("id ASC").
		Scan(&todasCorretoras).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao buscar corretoras: " + err.Error(),
		})
		return
	}

	// Buscar operações do mês
	var operacoes []struct {
		Data          time.Time `json:"data"`
		TipoOperacao  string    `json:"tipoOperacao"`
		ValorTotal    float64   `json:"valorTotal"`
		CorretoraID   uint      `json:"corretora_id"`
		CorretoraNome string    `json:"corretora_nome"`
		CorretoraCor  string    `json:"corretora_cor"`
	}

	err = DB.Table("operacoes o").
		Select(`
            o.data, 
            o.tipo_operacao, 
            o.valor_total,
            c.id as corretora_id,
            c.nome as corretora_nome
        `).
		Joins("JOIN tickers t ON t.id = o.ticker_id").
		Joins("JOIN corretoras c ON c.id = t.corretora_id").
		Where("o.data BETWEEN ? AND ?", inicioMes, fimMes).
		Order("c.nome, o.data ASC").
		Scan(&operacoes).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao buscar operações: " + err.Error(),
		})
		return
	}

	// Criar mapa de operações por corretora
	operacoesPorCorretora := make(map[uint][]struct {
		Data         time.Time
		TipoOperacao string
		ValorTotal   float64
	})

	for _, op := range operacoes {
		operacoesPorCorretora[op.CorretoraID] = append(operacoesPorCorretora[op.CorretoraID], struct {
			Data         time.Time
			TipoOperacao string
			ValorTotal   float64
		}{
			Data:         op.Data,
			TipoOperacao: op.TipoOperacao,
			ValorTotal:   op.ValorTotal,
		})
	}

	// Processar TODAS as corretoras (mesmo as sem operações)
	var resultado []gin.H

	for _, corretora := range todasCorretoras {
		corretoraData := gin.H{
			"corretora_id":   corretora.ID,
			"corretora_nome": corretora.Nome,
			"corretora_cor":  corretora.Cor,
			"semanas":        []gin.H{},
		}

		// Se a corretora tem operações, processá-las
		if ops, exists := operacoesPorCorretora[corretora.ID]; exists {
			semanas := make(map[int]gin.H)

			for _, op := range ops {
				semana := calcularSemanaDoMes(op.Data)

				if _, exists := semanas[semana]; !exists {
					semanas[semana] = gin.H{
						"semana":              semana,
						"total_compra_semana": 0.0,
						"total_venda_semana":  0.0,
						"fechamento_semana":   0.0, // NOVO
						"evolucao_semana":     0.0, // NOVO
						"retirada_semana":     0.0, // NOVO
						"dias":                make(map[string]gin.H),
					}
				}

				semanaData := semanas[semana]
				dias := semanaData["dias"].(map[string]gin.H)
				dataStr := op.Data.Format("2006-01-02")

				if _, exists := dias[dataStr]; !exists {
					dias[dataStr] = gin.H{
						"data":             dataStr,
						"total_compra_dia": 0.0,
						"total_venda_dia":  0.0,
						"fechamento_dia":   0.0, // NOVO
						"evolucao_dia":     0.0, // NOVO
						"retirada_dia":     0.0, // NOVO
					}
				}

				dia := dias[dataStr]
				if op.TipoOperacao == "C" {
					dia["total_compra_dia"] = dia["total_compra_dia"].(float64) + op.ValorTotal
					semanaData["total_compra_semana"] = semanaData["total_compra_semana"].(float64) + op.ValorTotal
				} else if op.TipoOperacao == "V" {
					dia["total_venda_dia"] = dia["total_venda_dia"].(float64) + op.ValorTotal
					semanaData["total_venda_semana"] = semanaData["total_venda_semana"].(float64) + op.ValorTotal
					dia["retirada_dia"] = dia["retirada_dia"].(float64) + op.ValorTotal                     // NOVO
					semanaData["retirada_semana"] = semanaData["retirada_semana"].(float64) + op.ValorTotal // NOVO
				}

				// Calcular totais do dia
				dia["fechamento_dia"] = dia["total_compra_dia"].(float64) + dia["total_venda_dia"].(float64) // NOVO
				dia["evolucao_dia"] = dia["total_venda_dia"].(float64) - dia["total_compra_dia"].(float64)   // NOVO

				dias[dataStr] = dia
				semanaData["dias"] = dias
				semanas[semana] = semanaData
			}

			// Calcular totais finais da semana
			for semanaNum, semanaData := range semanas {
				semanaData["fechamento_semana"] = semanaData["total_compra_semana"].(float64) + semanaData["total_venda_semana"].(float64) // NOVO
				semanaData["evolucao_semana"] = semanaData["total_venda_semana"].(float64) - semanaData["total_compra_semana"].(float64)   // NOVO
				semanas[semanaNum] = semanaData
			}

			// Converter semanas para array ordenado
			var semanasArray []gin.H
			for semana := 1; semana <= 6; semana++ {
				if semanaData, exists := semanas[semana]; exists {
					// Converter dias do map para array ordenado
					diasMap := semanaData["dias"].(map[string]gin.H)
					var diasArray []gin.H
					for _, dia := range diasMap {
						diasArray = append(diasArray, dia)
					}
					// Ordenar dias por data
					sort.Slice(diasArray, func(i, j int) bool {
						return diasArray[i]["data"].(string) < diasArray[j]["data"].(string)
					})
					semanaData["dias"] = diasArray
					semanasArray = append(semanasArray, semanaData)
				}
			}

			// Ordenar semanas
			sort.Slice(semanasArray, func(i, j int) bool {
				return semanasArray[i]["semana"].(int) < semanasArray[j]["semana"].(int)
			})

			corretoraData["semanas"] = semanasArray
		}

		resultado = append(resultado, corretoraData)
	}

	// Formatar resposta
	resposta := gin.H{
		"corretoras": resultado,
	}

	c.JSON(http.StatusOK, resposta)
}

// FUNÇÃO AUXILIAR - calcularSemanaDoMes
func calcularSemanaDoMes(data time.Time) int {
	dia := data.Day()
	return (dia-1)/7 + 1
}
