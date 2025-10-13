package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/back/models"
)

func NovoAporte(c *gin.Context) {
	var input struct {
		Data  string  `json:"data" binding:"required"`
		Valor float64 `json:"valor" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// sempre atualiza a data de atualização
	DataAtualizada := time.Now()

	novoValor := models.Aportes{
		Data:  DataAtualizada,
		Valor: input.Valor,
	}

	if err := DB.Create(&novoValor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, novoValor)
}

func GetAportes(c *gin.Context) {
	var aportes []models.Aportes
	if err := DB.Find(&aportes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, aportes)
}
