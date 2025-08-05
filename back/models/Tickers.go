package models

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type Tickers struct {
	gorm.Model
	CorretoraID uint           `gorm:"not null" json:"corretora"`
	Tick        string         `gorm:"size:20;not null" json:"tick"`
	Name        sql.NullString `json:"name"`
	DataCompra  time.Time      `gorm:"not null" json:"datacompra"`
	DataVenda   sql.NullTime   `json:"datavenda"`
	PrecoAtual  float64        `gorm:"default:0" json:"precoAtual"`

	Operacoes []Operacoes `gorm:"foreignKey:TickerID" json:"operacoes,omitempty"`
}
