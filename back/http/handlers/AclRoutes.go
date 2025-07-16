package handlers

import (
	"net/http"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/models"
)

func StoreAclRoutes(c *gin.Context) {
	var AclRoutes models.AclRoutes
	if err := c.Bind(&AclRoutes); err != nil {
		fmt.Println(err)
		c.JSON(400, gin.H{
			"erro": err,
		})
	}
	DB.Create(&AclRoutes)
	c.JSON(200, gin.H{
		"data": AclRoutes,
	})
}

// DeleteAclRoutes return Delete AclRoutes bills
func DeleteAclRoutes(c *gin.Context) {
	var AclRoutes models.AclRoutes
	id := c.Param("id")
	DB.Unscoped().Delete(&AclRoutes, id)
	c.JSON(http.StatusOK, gin.H{"data": "Deleted"})
}

// GetAclRoutes return edit AclRoutes bills
func GetAclRoutes(c *gin.Context) {
	var AclRoutes []models.AclRoutes
	id := c.Param("id")
	DB.Where("acl_id", id).Find(&AclRoutes)
	c.JSON(http.StatusOK, gin.H{"data": AclRoutes})
}
