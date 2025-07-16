package handlers

import (
	"net/http"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/models"
)

func StoreUserAcl(c *gin.Context) {
	var userAcl models.UserAcl
	if err := c.Bind(&userAcl); err != nil {
		fmt.Println(err)
		c.JSON(400, gin.H{
			"erro": err,
		})
	}
	DB.Create(&userAcl)
	c.JSON(200, gin.H{
		"data": userAcl,
	})
}

// DeleteUserAcl return Delete userAcl bills
func DeleteUserAcl(c *gin.Context) {
	var userAcl models.UserAcl
	id := c.Param("id")
	DB.Unscoped().Delete(&userAcl, id)
	c.JSON(http.StatusOK, gin.H{"data": "Deleted"})
}

type UserAclRoutes struct {
	ID     uint
	Name   string
	Routes []uint
}

// GetUserAcl return edit userAcl bills
func GetUserAcl(c *gin.Context) {
	tokenID := c.GetUint("id")

	var joinUserAcl []models.Acl
	var userAclRoutes []UserAclRoutes
	var newJoin []uint
	var userAcl []models.UserAcl

	DB.Preload("AclRef.RouteRef").Where("user_id", tokenID).Find(&userAcl)
	for indexUserAcl := 0; indexUserAcl < len(userAcl); indexUserAcl++ {
		joinUserAcl = append(joinUserAcl, userAcl[indexUserAcl].AclRef)
		for indexJoinUserAcl := 0; indexJoinUserAcl < len(joinUserAcl[indexUserAcl].RouteRef); indexJoinUserAcl++ {
			newJoin = append(newJoin, joinUserAcl[indexUserAcl].RouteRef[indexJoinUserAcl].RouteId)
		}
		userAclRoutes = append(userAclRoutes, UserAclRoutes{userAcl[indexUserAcl].ID, userAcl[indexUserAcl].AclRef.Name, newJoin})

	}

	c.JSON(http.StatusOK, gin.H{"data": userAclRoutes})
}
