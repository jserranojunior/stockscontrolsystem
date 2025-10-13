package models

import (
	"time"

	"gorm.io/gorm"
)

type Aportes struct {
	gorm.Model
	Data  time.Time `gorm:"not null" json:"data"`
	Valor float64   `gorm:"column:valor;not null" json:"valor"`
}
