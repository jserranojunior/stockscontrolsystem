package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/back/models"
)

func NovoValorTicker(c *gin.Context) {
	var input struct {
		TickerID   uint    `json:"tickerId" binding:"required"`
		Data       string  `json:"data" binding:"required"`
		ValorAtual float64 `json:"valorAtual" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// sempre atualiza a data de atualização
	DataAtualizacaoPrecoAtual := time.Now()

	novoValor := models.ValoresTickers{
		TickerID:   input.TickerID,
		Data:       DataAtualizacaoPrecoAtual,
		ValorAtual: input.ValorAtual,
	}

	if err := DB.Create(&novoValor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, novoValor)
}
