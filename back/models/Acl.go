package models

import (
	"gorm.io/gorm"
)

//ContasAPagars struct export
type Acl struct {
	gorm.Model
	Name          string               `gorm:"size:255; not null;" json:"name"`
	RouteRef      []AclRoutes    						`gorm:"foreignKey:AclId"`
}
