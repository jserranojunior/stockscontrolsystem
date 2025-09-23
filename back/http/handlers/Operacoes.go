package handlers

import (
	"fmt"
	"net/http"

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
