package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/back/models"
)

// Atualizar um caixa existente
func UpdateCaixa(c *gin.Context) {
	id := c.Param("id") // pega o ID da URL

	var caixa models.Caixa
	if err := DB.First(&caixa, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"erro": "Registro não encontrado"})
		return
	}

	// Faz o bind dos dados enviados
	if err := c.Bind(&caixa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": err.Error()})
		return
	}

	if err := DB.Save(&caixa).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": caixa})
}

// Buscar todos os caixas
func GetCaixas(c *gin.Context) {
	var caixas []models.Caixa

	if err := DB.Find(&caixas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	c.JSON(http.StatusOK, caixas)
}
