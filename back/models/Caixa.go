package models

import (
	"gorm.io/gorm"
)

// ContasAPagars struct export
type Caixa struct {
	gorm.Model
	Valor float64 `gorm:"not null" json:"valor"` // Valor
}
