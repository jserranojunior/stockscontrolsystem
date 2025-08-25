package handlers

import (
	"fmt"
	"math"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/models"
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

// GetOperacoesPorSemanaDoMes retorna as operações agrupadas por semana dentro de um mês específico
// GetOperacoesPorCorretoraEMes retorna as operações agrupadas por corretora dentro de um mês específico
// GetOperacoesPorCorretoraEMes retorna as operações agrupadas por corretora dentro de um mês específico
// GetOperacoesPorCorretoraEMes retorna as operações agrupadas por corretora dentro de um mês específico
// GetOperacoesPorCorretoraParaTabela retorna dados organizados para a tabela HTML
// GetOperacoesPorCorretoraParaTabela retorna dados organizados para a tabela HTML
func GetOperacoesPorCorretoraParaTabela(c *gin.Context) {
	ano := c.DefaultQuery("ano", "2025")
	mes := c.DefaultQuery("mes", "08")

	// Buscar TODAS as corretoras (mesmo as sem operações)
	var corretoras []models.Corretoras
	if err := DB.Find(&corretoras).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar corretoras: " + err.Error()})
		return
	}

	// Calcular número de semanas reais no mês
	anoInt, _ := strconv.Atoi(ano)
	mesInt, _ := strconv.Atoi(mes)
	primeiraData := time.Date(anoInt, time.Month(mesInt), 1, 0, 0, 0, 0, time.UTC)
	ultimaData := primeiraData.AddDate(0, 1, -1)
	numSemanas := int(math.Ceil(float64(ultimaData.Day()+int(primeiraData.Weekday())) / 7))

	var resultado []map[string]interface{}

	for _, corretora := range corretoras {
		// Buscar operações agrupadas por dia apenas para esta corretora no período
		var operacoesPorDia []struct {
			Data      string  `json:"data"`
			SomaTotal float64 `json:"somaTotal"`
			SomaQuant float64 `json:"somaQuant"`
		}

		if err := DB.Debug().Table("operacoes o").
			Select(`
				DATE(o.data) as data,
				COALESCE(SUM(o.valor_total), 0) as soma_total,
				COALESCE(SUM(o.quantidade), 0) as soma_quant`).
			Joins("INNER JOIN tickers t ON t.id = o.ticker_id").
			Where("t.corretora_id = ? AND YEAR(o.data) = ? AND MONTH(o.data) = ?",
				corretora.ID, ano, mes).
			Group("DATE(o.data)").
			Order("data").
			Scan(&operacoesPorDia).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar operações: " + err.Error()})
			return
		}

		// Calcular totais mensais
		var totalMensal, quantMensal float64
		semanas := make(map[int]map[string]interface{})

		for _, dia := range operacoesPorDia {
			// Parse da data
			data, _ := time.Parse("2006-01-02", dia.Data)
			semana := calcularSemanaDoMes(data)

			totalMensal += dia.SomaTotal
			quantMensal += dia.SomaQuant

			// Inicializar semana se não existir
			if _, exists := semanas[semana]; !exists {
				semanas[semana] = map[string]interface{}{
					"semana":      semana,
					"totalSemana": 0.0,
					"quantSemana": 0.0,
					"dias":        []map[string]interface{}{},
				}
			}

			// Adicionar dia à semana
			semanaData := semanas[semana]
			semanaData["totalSemana"] = semanaData["totalSemana"].(float64) + dia.SomaTotal
			semanaData["quantSemana"] = semanaData["quantSemana"].(float64) + dia.SomaQuant

			dias := semanaData["dias"].([]map[string]interface{})
			dias = append(dias, map[string]interface{}{
				"data":       data.Format("02/01"),
				"fechamento": dia.SomaTotal,
				"quantidade": dia.SomaQuant,
			})
			semanaData["dias"] = dias
			semanas[semana] = semanaData
		}

		// Converter mapa de semanas para array ordenado
		var semanasArray []map[string]interface{}
		for semanaNum := 1; semanaNum <= numSemanas; semanaNum++ {
			if semana, exists := semanas[semanaNum]; exists {
				semanasArray = append(semanasArray, semana)
			} else {
				semanasArray = append(semanasArray, map[string]interface{}{
					"semana":      semanaNum,
					"totalSemana": 0.0,
					"quantSemana": 0.0,
					"dias":        []map[string]interface{}{},
				})
			}
		}

		// Ordenar semanas
		sort.Slice(semanasArray, func(i, j int) bool {
			return semanasArray[i]["semana"].(int) < semanasArray[j]["semana"].(int)
		})

		// Incluir TODOS os dados da corretora
		resultado = append(resultado, map[string]interface{}{
			"corretoraId":      corretora.ID,
			"corretoraNome":    corretora.Nome,
			"corretoraData":    corretora.Data,
			"corretoraInfo":    corretora.Info,
			"corretoraMoeda":   corretora.Moeda,
			"corretoraCor":     corretora.Cor,
			"corretoraCreated": corretora.CreatedAt,
			"corretoraUpdated": corretora.UpdatedAt,
			"totalMensal":      totalMensal,
			"quantidadeMensal": quantMensal,
			"totalOperacoes":   len(operacoesPorDia),
			"semanas":          semanasArray,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"dadosPorCorretora": resultado,
		"periodo":           fmt.Sprintf("%s/%s", mes, ano),
	})
}

// Função auxiliar para calcular a semana do mês (simplificada)
func calcularSemanaDoMes(data time.Time) int {
	dia := data.Day()
	return (dia-1)/7 + 1
}

/* // Função auxiliar para calcular a semana do mês
func calcularSemanaDoMes(data time.Time) int {
	// Calcula a semana do mês baseado no dia
	dia := data.Day()
	semana := (dia-1)/7 + 1

	// Garante que a semana seja entre 1 e 6 (máximo teórico)
	if semana < 1 {
		semana = 1
	}
	if semana > 6 {
		semana = 6
	}

	return semana
} */

// Função auxiliar para agrupar dados por semana
func agruparPorSemana(operacoes []struct {
	Data      time.Time `json:"data"`
	SomaTotal float64   `json:"somaTotal"`
	SomaQuant float64   `json:"somaQuant"`
}, ano, mes string) []map[string]interface{} {

	// Calcular o número de semanas no mês
	anoInt, _ := strconv.Atoi(ano)
	mesInt, _ := strconv.Atoi(mes)

	primeiraData := time.Date(anoInt, time.Month(mesInt), 1, 0, 0, 0, 0, time.UTC)
	ultimaData := primeiraData.AddDate(0, 1, -1)

	numSemanas := int(math.Ceil(float64(ultimaData.Day()+int(primeiraData.Weekday())) / 7))

	// Criar estrutura para as semanas
	semanas := make([]map[string]interface{}, numSemanas)

	for i := 0; i < numSemanas; i++ {
		semanas[i] = map[string]interface{}{
			"semana":           i + 1,
			"operacoes":        []interface{}{},
			"totalSemana":      0.0,
			"quantidadeSemana": 0.0,
		}
	}

	// Distribuir as operações pelas semanas
	for _, op := range operacoes {
		// Calcular a semana do mês (1-4 ou 1-5)
		semana := (op.Data.Day()-1)/7 + 1
		if semana > numSemanas {
			semana = numSemanas
		}

		// Adicionar à semana correspondente
		semanaIndex := semana - 1
		semanas[semanaIndex]["operacoes"] = append(semanas[semanaIndex]["operacoes"].([]interface{}), op)

		// Somar totais da semana
		semanas[semanaIndex]["totalSemana"] = semanas[semanaIndex]["totalSemana"].(float64) + op.SomaTotal
		semanas[semanaIndex]["quantidadeSemana"] = semanas[semanaIndex]["quantidadeSemana"].(float64) + op.SomaQuant
	}

	return semanas
}
