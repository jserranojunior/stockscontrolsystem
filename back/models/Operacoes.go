package models

import (
	"time"

	"gorm.io/gorm"
)

type Operacoes struct {
	gorm.Model
	TickerID     uint      `gorm:"not null" json:"tickerId"`            // Relação com Tickers
	TipoOperacao string    `gorm:"size:1;not null" json:"tipoOperacao"` // "C" (compra) ou "V" (venda)
	Data         time.Time `gorm:"not null" json:"data"`
	Quantidade   float64   `gorm:"not null" json:"quantidade"`
	ValorTotal   float64   `gorm:"column:valor_total;not null" json:"valorTotal"` // Define explicitamente a coluna
	ValorUnidade float64   `gorm:"not null" json:"valorUnidade"`
	// Campos adicionais para cálculo
	PrecoMedioCompra float64 `gorm:"default:0" json:"precoMedioCompra"`
	SaldoTickers     float64 `gorm:"default:0" json:"saldoTickers"`
	Carteira         float64 `gorm:"default:0" json:"carteira"`

	Resultado float64 `gorm:"default:0" json:"resultado"`
	Lp        float64 `gorm:"default:0" json:"lp"`

	Ticker Tickers `gorm:"foreignKey:TickerID" json:"ticker,omitempty"`
}

type OperacaoDTO struct {
	ID                        uint      `json:"id"`
	Tick                      string    `json:"tick"`
	TipoOperacao              string    `json:"tipoOperacao"`
	Data                      time.Time `json:"data"`
	Quantidade                float64   `json:"quantidade"`
	ValorTotal                float64   `json:"valorTotal"`
	ValorUnidade              float64   `json:"valorUnidade"`
	PrecoMedio                float64   `json:"precoMedio"`
	Saldo                     float64   `json:"saldo"`
	Carteira                  float64   `json:"carteira"`
	PrecoAtual                float64   `json:"precoAtual"`
	DataAtualizacaoPrecoAtual time.Time `json:"dataAtualizacaoPrecoAtual"`
}
