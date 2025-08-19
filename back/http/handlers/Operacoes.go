package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/models"
	"gorm.io/gorm"
)

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
