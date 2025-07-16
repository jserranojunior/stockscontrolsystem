package models

import (
	"gorm.io/gorm"
)

// ContasAPagars struct export
type UserAcl struct {
	gorm.Model
	UserId  uint `gorm:"not null;" json:"user_id"`
	AclId   uint `gorm:"not null;" json:"acl_id"`
	AclRef  Acl  `gorm:"foreignKey:AclId"`
	UserRef User `gorm:"foreignKey:ID;references:user_id"`
}
