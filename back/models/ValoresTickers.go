package models

import (
	"time"

	"gorm.io/gorm"
)

type ValoresTickers struct {
	gorm.Model
	TickerID   uint      `gorm:"not null" json:"tickerId"`
	Data       time.Time `gorm:"not null" json:"data"`
	ValorAtual float64   `gorm:"column:valorAtual;not null" json:"valorAtual"`
}
