package handlers

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/models"
	"gorm.io/gorm"
)

type TickerResponse struct {
	ID          uint               `json:"ID"`
	CreatedAt   time.Time          `json:"CreatedAt"`
	UpdatedAt   time.Time          `json:"UpdatedAt"`
	DeletedAt   gorm.DeletedAt     `json:"DeletedAt"` // ← Alterado para gorm.DeletedAt
	CorretoraID uint               `json:"corretora"`
	Tick        string             `json:"tick"`
	Name        sql.NullString     `json:"name"`
	DataCompra  time.Time          `json:"datacompra"`
	DataVenda   sql.NullTime       `json:"datavenda"`
	PrecoAtual  float64            `json:"precoAtual"`
	Operacoes   []OperacaoResponse `json:"operacoes,omitempty"`
}

type OperacaoResponse struct {
	ID               uint      `json:"ID"`
	TickerID         uint      `json:"tickerId"`
	TipoOperacao     string    `json:"tipoOperacao"`
	Data             time.Time `json:"data"`
	Quantidade       float64   `json:"quantidade"`
	ValorTotal       float64   `json:"valorTotal"`
	ValorUnidade     float64   `json:"valorUnidade"`
	PrecoMedioCompra float64   `json:"precoMedioCompra"`
	SaldoTickers     float64   `json:"saldoTickers"`
	Carteira         float64   `json:"carteira"`
}

func GetTickersPorCorretoraID(c *gin.Context) {
	corretoraID, err := strconv.Atoi(c.Param("corretoraID"))
	if err != nil || corretoraID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CorretoraID inválido"})
		return
	}

	// 1. Primeiro buscar os tickers
	var tickersDB []models.Tickers
	if err := DB.Where("corretora_id = ?", corretoraID).Find(&tickersDB).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(tickersDB) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Nenhum ticker encontrado para esta corretora"})
		return
	}

	// 2. Para cada ticker, buscar a última operação individualmente
	for i := range tickersDB {
		if err := DB.
			Where("ticker_id = ?", tickersDB[i].ID).
			Order("data DESC").
			Limit(1).
			Find(&tickersDB[i].Operacoes).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// 3. Converter para a struct de response
	var tickers []TickerResponse
	for _, tickerDB := range tickersDB {
		// Converter operações
		var operacoes []OperacaoResponse
		for _, op := range tickerDB.Operacoes {
			operacoes = append(operacoes, OperacaoResponse{
				ID:               op.ID,
				TickerID:         op.TickerID,
				TipoOperacao:     op.TipoOperacao,
				Data:             op.Data,
				Quantidade:       op.Quantidade,
				ValorTotal:       op.ValorTotal,
				ValorUnidade:     op.ValorUnidade,
				PrecoMedioCompra: op.PrecoMedioCompra,
				SaldoTickers:     op.SaldoTickers,
				Carteira:         op.Carteira,
			})
		}

		tickers = append(tickers, TickerResponse{
			ID:          tickerDB.ID,
			CreatedAt:   tickerDB.CreatedAt,
			UpdatedAt:   tickerDB.UpdatedAt,
			DeletedAt:   tickerDB.DeletedAt,
			CorretoraID: tickerDB.CorretoraID,
			Tick:        tickerDB.Tick,
			Name:        tickerDB.Name,
			DataCompra:  tickerDB.DataCompra,
			DataVenda:   tickerDB.DataVenda,
			PrecoAtual:  tickerDB.PrecoAtual,
			Operacoes:   operacoes,
		})
	}

	c.JSON(http.StatusOK, tickers)
}
