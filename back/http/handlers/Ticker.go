package handlers

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/back/models"
	"gorm.io/gorm"
)

type TickerResponse struct {
	ID                        uint               `json:"ID"`
	CreatedAt                 time.Time          `json:"CreatedAt"`
	UpdatedAt                 time.Time          `json:"UpdatedAt"`
	DeletedAt                 gorm.DeletedAt     `json:"DeletedAt"` // ← Alterado para gorm.DeletedAt
	CorretoraID               uint               `json:"corretora"`
	Tick                      string             `json:"tick"`
	Name                      sql.NullString     `json:"name"`
	DataCompra                time.Time          `json:"datacompra"`
	DataVenda                 sql.NullTime       `json:"datavenda"`
	PrecoAtual                float64            `json:"precoAtual"`
	Operacoes                 []OperacaoResponse `json:"operacoes,omitempty"`
	DataAtualizacaoPrecoAtual time.Time          `json:"dataAtualizacaoPrecoAtual"`
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

	// Buscar tickers com suas operações (sem duplicar por JOIN)
	var tickersDB []models.Tickers
	if err := DB.Preload("Operacoes", func(db *gorm.DB) *gorm.DB {
		return db.Order("operacoes.data ASC").Order("operacoes.created_at ASC")
	}).Where("corretora_id = ?", corretoraID).Order("name ASC").
		Find(&tickersDB).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(tickersDB) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Nenhum ticker encontrado para esta corretora"})
		return
	}

	// Converter para a struct de response
	var tickers []TickerResponse
	for _, tickerDB := range tickersDB {
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
			ID:                        tickerDB.ID,
			CreatedAt:                 tickerDB.CreatedAt,
			UpdatedAt:                 tickerDB.UpdatedAt,
			DeletedAt:                 tickerDB.DeletedAt,
			CorretoraID:               tickerDB.CorretoraID,
			Tick:                      tickerDB.Tick,
			Name:                      tickerDB.Name,
			DataCompra:                tickerDB.DataCompra,
			DataVenda:                 tickerDB.DataVenda,
			PrecoAtual:                tickerDB.PrecoAtual,
			Operacoes:                 operacoes,
			DataAtualizacaoPrecoAtual: tickerDB.DataAtualizacaoPrecoAtual,
		})
	}

	c.JSON(http.StatusOK, tickers)
}

type AddTickerInput struct {
	CorretoraID               uint    `json:"corretora" binding:"required"`
	Tick                      string  `json:"tick" binding:"required"`
	Name                      string  `json:"name"`
	DataCompra                string  `json:"datacompra" binding:"required"`
	PrecoAtual                float64 `json:"precoAtual"`
	DataAtualizacaoPrecoAtual string  `json:"dataAtualizacaoPrecoAtual"`
}

func AddTicker(c *gin.Context) {
	var input AddTickerInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// --- 1. Verificação de Duplicidade ---
	var existingTicker models.Tickers
	// Tenta encontrar um Ticker com o mesmo 'Tick' (código do ativo, ex: PETR4)
	result := DB.Where("tick = ?", input.Tick).First(&existingTicker)

	if result.Error == nil {
		// Se não houver erro, significa que o Ticker foi encontrado.
		// O ticker já existe, retorna um erro de conflito (HTTP 409 Conflict) ou Bad Request (HTTP 400).
		c.JSON(http.StatusConflict, gin.H{"error": "Já existe um ativo cadastrado com o mesmo código (Tick)."})
		return
	}

	// Se o erro for diferente de gorm.ErrRecordNotFound, ocorreu um problema no banco de dados.
	if result.Error != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao consultar o banco de dados para verificar o ticker existente."})
		return
	}
	// Se o erro for gorm.ErrRecordNotFound, podemos continuar o cadastro.
	// ----------------------------------------

	// Converte DataCompra
	dataCompra, err := time.Parse("2006-01-02", input.DataCompra)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DataCompra inválida"})
		return
	}

	// Cria a struct do novo Ticker
	ticker := models.Tickers{
		CorretoraID:               input.CorretoraID,
		Tick:                      input.Tick,
		Name:                      sql.NullString{String: input.Name, Valid: input.Name != ""},
		DataCompra:                dataCompra,
		PrecoAtual:                input.PrecoAtual,
		DataAtualizacaoPrecoAtual: time.Now(),
	}

	// Salva o novo Ticker
	if err := DB.Create(&ticker).Error; err != nil {
		// Se o erro for uma falha de unicidade no DB (caso o 'Tick' tenha um índice UNIQUE),
		// você pode tentar capturar isso aqui, mas a verificação anterior já previne a maioria dos casos.
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao salvar ticker"})
		return
	}

	c.JSON(http.StatusCreated, ticker) // Status 201 Created é mais apropriado para criação
}

type UpdateTickerInput struct {
	Tick       *string  `json:"tick,omitempty"`
	Name       *string  `json:"name,omitempty"`
	DataCompra *string  `json:"datacompra,omitempty"`
	DataVenda  *string  `json:"datavenda,omitempty"`
	PrecoAtual *float64 `json:"precoAtual,omitempty"`
}

func UpdateTicker(c *gin.Context) {
	// pega ID do ticker da rota
	tickerID := c.Param("id")
	if tickerID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Parâmetro 'id' é obrigatório"})
		return
	}

	// bind JSON
	var input UpdateTickerInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// busca ticker
	var ticker models.Tickers
	if err := DB.First(&ticker, tickerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticker não encontrado"})
		return
	}

	// atualiza campos apenas se vierem no JSON
	if input.Tick != nil {
		ticker.Tick = *input.Tick
	}
	if input.Name != nil {
		ticker.Name = sql.NullString{String: *input.Name, Valid: true}
	}
	if input.DataCompra != nil {
		if dc, err := time.Parse("2006-01-02", *input.DataCompra); err == nil {
			ticker.DataCompra = dc
		}
	}
	if input.DataVenda != nil {
		if dv, err := time.Parse("2006-01-02", *input.DataVenda); err == nil {
			ticker.DataVenda = sql.NullTime{Time: dv, Valid: true}
		}
	}
	if input.PrecoAtual != nil {
		ticker.PrecoAtual = *input.PrecoAtual
	}

	// sempre atualiza a data de atualização
	ticker.DataAtualizacaoPrecoAtual = time.Now()

	// salva alterações
	if err := DB.Save(&ticker).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar ticker"})
		return
	}

	c.JSON(http.StatusOK, ticker)
}
