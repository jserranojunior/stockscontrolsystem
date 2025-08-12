package handlers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/models"
	"gorm.io/gorm"
)

type OperacaoDTO struct {
	Tick         string    `json:"tick"`
	TipoOperacao string    `json:"tipoOperacao"`
	Data         time.Time `json:"data"`
	Quantidade   float64   `json:"quantidade"`
	ValorTotal   float64   `json:"valorTotal"`
	ValorUnidade float64   `json:"valorUnidade"`
	PrecoMedio   float64   `json:"precoMedio"`
	Saldo        float64   `json:"saldo"`
	Carteira     float64   `json:"carteira"`
	PrecoAtual   float64   `json:"precoAtual"`
}

type CorretoraDTO struct {
	Nome      string        `json:"nome"`
	Cor       string        `json:"cor"`
	Operacoes []OperacaoDTO `json:"operacoes"`
}

// Use a variável global DB (definida em outro lugar)

func GetCorretoras(c *gin.Context) {
	var corretoras []models.Corretoras
	if err := DB.Preload("Tickers").Find(&corretoras).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, corretoras)
}

func GetCorretoraPorID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var corretora models.Corretoras
	if err := DB.Preload("Tickers").First(&corretora, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Corretora não encontrada"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, corretora)
}

func CriarCorretora(c *gin.Context) {
	var input struct {
		Nome  string `json:"nome" binding:"required"`
		Data  string `json:"data" binding:"required"`
		Info  string `json:"info"`
		Moeda string `json:"moeda" binding:"required"`
		Cor   string `json:"cor"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dataParsed, err := time.Parse("2006-01-02", input.Data)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data inválida, formato esperado YYYY-MM-DD"})
		return
	}

	corretora := models.Corretoras{
		Nome:  input.Nome,
		Data:  dataParsed,
		Info:  input.Info,
		Moeda: input.Moeda,
		Cor:   input.Cor,
	}

	if err := DB.Create(&corretora).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, corretora)
}

func AtualizarCorretora(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var input struct {
		Nome  string `json:"nome"`
		Data  string `json:"data"`
		Info  string `json:"info"`
		Moeda string `json:"moeda"`
		Cor   string `json:"cor"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var corretora models.Corretoras
	if err := DB.First(&corretora, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Corretora não encontrada"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if input.Nome != "" {
		corretora.Nome = input.Nome
	}
	if input.Data != "" {
		dataParsed, err := time.Parse("2006-01-02", input.Data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Data inválida, formato esperado YYYY-MM-DD"})
			return
		}
		corretora.Data = dataParsed
	}
	if input.Info != "" {
		corretora.Info = input.Info
	}
	if input.Moeda != "" {
		corretora.Moeda = input.Moeda
	}
	if input.Cor != "" {
		corretora.Cor = input.Cor
	}

	if err := DB.Save(&corretora).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, corretora)
}

func DeletarCorretora(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	if err := DB.Delete(&models.Corretoras{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}

func GetCorretorasComOperacoes(c *gin.Context) {
	var corretoras []models.Corretoras
	err := DB.Preload("Tickers.Operacoes").Find(&corretoras).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, corretoras)
}

func GetCorretorasComOperacoesPerfomance(c *gin.Context) {
	var corretoras []models.Corretoras

	// Carrega Tickers e suas Operações
	err := DB.Preload("Tickers.Operacoes").Find(&corretoras).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Monta o DTO de resposta
	var resposta []CorretoraDTO
	for _, cor := range corretoras {
		corDTO := CorretoraDTO{
			Nome: cor.Nome,
			Cor:  cor.Cor,
		}

		for _, ticker := range cor.Tickers {
			for _, op := range ticker.Operacoes {
				opDTO := OperacaoDTO{
					Tick:         ticker.Tick,
					TipoOperacao: op.TipoOperacao,
					Data:         op.Data,
					Quantidade:   op.Quantidade,
					ValorTotal:   op.ValorTotal,
					ValorUnidade: op.ValorUnidade,
					PrecoMedio:   op.PrecoMedioCompra,
					Saldo:        op.SaldoTickers,
					Carteira:     op.Carteira,
					PrecoAtual:   ticker.PrecoAtual,
				}
				corDTO.Operacoes = append(corDTO.Operacoes, opDTO)
			}
		}

		resposta = append(resposta, corDTO)
	}

	c.JSON(http.StatusOK, resposta)
}
