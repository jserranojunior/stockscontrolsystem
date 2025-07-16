package handlers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"github.com/jserranojunior/scs/backgo/http/middlewares"
	"github.com/jserranojunior/scs/backgo/models"
)

// ----------------------------------------------------------------------------
// Auxiliar: compara senha usando bcrypt
// ----------------------------------------------------------------------------
func compareBcrypt(hashedPassword, plainPassword string) bool {
	return bcrypt.CompareHashAndPassword(
		[]byte(hashedPassword),
		[]byte(plainPassword),
	) == nil
}

// ----------------------------------------------------------------------------
// POST /auth/login
// ----------------------------------------------------------------------------
func AuthLogin(c *gin.Context) {
	//----------------------------------------------------------------------
	// 1. Leitura e validação do corpo JSON
	//----------------------------------------------------------------------
	var payload struct {
		Email    string `json:"email"    binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Dados de login inválidos",
			"error":   err.Error(),
		})
		return
	}

	//----------------------------------------------------------------------
	// 2. Busca do usuário no banco (somente id e hash da senha)
	//----------------------------------------------------------------------
	var dbUser models.User
	if err := DB.Select("id", "password").
		Where("email = ?", payload.Email).
		First(&dbUser).Error; err != nil {

		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "E-mail ou senha incorretos",
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Erro ao buscar usuário",
				"error":   err.Error(),
			})
		}
		return
	}

	//----------------------------------------------------------------------
	// 3. Compara o hash
	//----------------------------------------------------------------------
	if !compareBcrypt(dbUser.Password, payload.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "E-mail ou senha incorretos",
		})
		return
	}

	//----------------------------------------------------------------------
	// 4. Gera e devolve o JWT
	//----------------------------------------------------------------------
	token := middlewares.GenerateJwt(dbUser.ID)
	fmt.Println("Token gerado:", token)

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}
