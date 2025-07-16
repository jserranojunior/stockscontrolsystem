package models

import (
	"time"

	"gorm.io/gorm"
)

// ContasAPagars struct export
type ContasAPagars struct {
	gorm.Model
	UserId                    uint                    `gorm:"" json:"user_id"`
	CategoriasContasAPagarId  uint                    `gorm:"" json:"categorias_contas_a_pagar_id"`
	Favorecido                string                  `gorm:"size:255; not null;" json:"favorecido"`
	InicioDataPagamento       time.Time               `gorm:"not null;" json:"inicio_data_pagamento"`
	FimDataPagamento          time.Time               `gorm:"" json:"fim_data_pagamento"`
	Descricao                 string                  `gorm:"size:255" json:"descricao"`
	FormaPagamento            string                  `gorm:"size:255" json:"forma_pagamento"`
	TipoConta                 string                  `gorm:"size:255" json:"tipo_conta"`
	Parcelas                  int                     `gorm:"size:62" json:"parcelas"`
	ValoresContasAPagar       ValoresContasAPagars    `gorm:"foreignKey:contas_a_pagar_id"`
	ContasPagas               ContasPagas             `gorm:"foreignKey:contas_a_pagar_id"`
	UserRef                   User                    `gorm:"foreignKey:UserId"`
	CategoriasContasAPagarRef CategoriasContasAPagars `gorm:"foreignKey:CategoriasContasAPagarId"`
}
