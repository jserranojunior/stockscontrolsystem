package models

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type Tickers struct {
	gorm.Model
	CorretoraID               uint           `gorm:"not null" json:"corretora"`
	Tick                      string         `gorm:"size:20;not null" json:"tick"`
	Name                      sql.NullString `json:"name"`
	DataCompra                time.Time      `gorm:"not null" json:"datacompra"`
	DataVenda                 sql.NullTime   `json:"datavenda"`
	DataAtualizacaoPrecoAtual time.Time      `json:"dataAtualizacaoPrecoAtual"`

	Operacoes      []Operacoes      `gorm:"foreignKey:TickerID" json:"operacoes,omitempty"`
	ValoresTickers []ValoresTickers `gorm:"foreignKey:TickerID;references:ID" json:"valoresTickers,omitempty"`
}
