package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/models"
)

// Select return user
func CheckNivelAclWithUserID(c *gin.Context) {
	var user models.User
	tokenID := c.GetUint("id")
	DB.First(&user, tokenID)
	acl := 0
	if user.ID > 0 {
		acl = 2
	}

	c.JSON(200, gin.H{
		"data": acl,
	})
}
