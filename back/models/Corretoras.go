package models

import (
	"time"

	"gorm.io/gorm"
)

type Corretoras struct {
	gorm.Model
	Nome    string    `gorm:"size:255;not null" json:"nome"`
	Data    time.Time `gorm:"not null" json:"data"`
	Info    string    `gorm:"size:255" json:"info"`
	Moeda   string    `gorm:"size:10;not null" json:"moeda"`
	Cor     string    `gorm:"size:50" json:"cor"`
	Tickers []Tickers `gorm:"foreignKey:CorretoraID" json:"tickers"`
}
