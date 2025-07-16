package models

import (
	"gorm.io/gorm"
)

//ContasAPagars struct export
type AclRoutes struct {
	gorm.Model
	RouteId 			uint                `gorm:"not null;" json:"route_id"`
	AclId        uint               `gorm:"not null;" json:"acl_id"`
	AclRef			 Acl 								`gorm:"foreignKey:AclId"`
}

