package middlewares

import (
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"

	"github.com/gbrlsnchs/jwt/v3"
	"github.com/gin-gonic/gin"
	// "reflect"
)

// VerifyJwt verify jwt is valid
var VerifyJwt gin.HandlerFunc = func(c *gin.Context) {

	if c.Request.Header["Authorization"] != nil {
		hash := jwt.NewHS256([]byte("8b17PtHax539DpX4i7kC55c1e1NrzwryjfOXEROblmEYoIModcXl13690DICiwaOJ"))
		payload := jwt.Payload{}

		HeaderToken := strings.Split(c.Request.Header["Authorization"][0], " ")[1]
		token := []byte(HeaderToken)
		hd, err := jwt.Verify(token, hash, &payload)

		if err != nil {
			c.JSON(401, gin.H{
				"Data": "Token Invalido",
			})
			c.Abort()
		} else {

			tokenInt, err := strconv.Atoi(hd.KeyID)
			if err != nil {
				fmt.Println(err)
			}
			tokenUint := uint(tokenInt)

			c.Set("id", tokenUint)
			c.Next()
		}
	} else {
		c.JSON(401, gin.H{
			"Data": "Token inexistente",
		})
		c.Abort()
	}
}

// GenerateJwt return JWT
func GenerateJwt(ID uint) string {

	hs := jwt.NewHS256([]byte("8b17PtHax539DpX4i7kC55c1e1NrzwryjfOXEROblmEYoIModcXl13690DICiwaOJ"))
	now := time.Now()
	pl := jwt.Payload{
		Issuer:   "gbrlsnchs",
		Subject:  "login",
		IssuedAt: jwt.NumericDate(now),
	}
	stringID := strconv.Itoa(int(ID))
	token, err := jwt.Sign(pl, hs, jwt.ContentType("JWT"), jwt.KeyID(stringID))
	if err != nil {
		log.Fatal(err)
	}
	return string(token)

	//uint8
}
