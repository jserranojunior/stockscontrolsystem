package models

import (
	"time"

	"gorm.io/gorm"
)

type Operacoes struct {
	gorm.Model
	TickerID     uint      `gorm:"not null" json:"tickerId"`            // relação com Tickers
	TipoOperacao string    `gorm:"size:1;not null" json:"tipoOperacao"` // "C" (compra) ou "V" (venda)
	Data         time.Time `gorm:"not null" json:"data"`
	Quantidade   float64   `gorm:"not null" json:"quantidade"`
	ValorTotal   float64   `gorm:"not null" json:"valorTotal"`
	ValorUnidade float64   `gorm:"not null" json:"valorUnidade"`
	// Campos adicionais para calculo
	PrecoMedioCompra float64 `gorm:"default:0" json:"precoMedioCompra"`
	SaldoTickers     float64 `gorm:"default:0" json:"saldoTickers"`
	Carteira         float64 `gorm:"default:0" json:"carteira"`

	Ticker Tickers `gorm:"foreignKey:TickerID" json:"ticker,omitempty"`
}
