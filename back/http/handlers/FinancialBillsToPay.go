package handlers

import (
	"fmt"
	"net/http"

	// "alvitre.com.br/scs/api/financial/valuesbillstopay"
	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/backgo/helpers"
	"github.com/jserranojunior/scs/backgo/models"
	"gorm.io/gorm"

	"errors"
)

// GetCategoriesAndBillsMonth return Categories, Bills, Values, Paid
func GetBillsMonth(c *gin.Context) {
	tokenID := c.GetUint("id")
	if tokenID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "usuário não autenticado"})
		return
	}

	dateandname := c.Param("date")
	if len(dateandname) < 7 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "data inválida"})
		return
	}
	dateStart := dateandname[:7]

	queryPagas := "SUBSTRING(data_pagamento,1,7) = ? AND data_pagamento > ''"
	queryValores := "SUBSTRING(data_pagamento,1,7) = (?)  OR SUBSTRING(data_pagamento,1,7) < ?"

	queryContas := `
	(
		(SUBSTRING(inicio_data_pagamento,1,7) <= ? AND SUBSTRING(fim_data_pagamento,1,7) >= ? AND user_id = ?) OR
		(SUBSTRING(inicio_data_pagamento,1,7) <= ? AND fim_data_pagamento IS NULL AND user_id = ?) OR
		(SUBSTRING(inicio_data_pagamento,1,7) <= ? AND fim_data_pagamento = '' AND user_id = ?)
	)
`

	var contasapagar []models.ContasAPagars

	DB.Where(queryContas, dateStart, dateStart, tokenID, dateStart, tokenID, dateStart, tokenID).
		Preload("ContasPagas", queryPagas, dateStart).
		Preload("ValoresContasAPagar", queryValores, dateStart, dateStart).
		Find(&contasapagar)

	c.JSON(http.StatusOK, gin.H{
		"data": contasapagar,
	})
}

func EditBillsToPayMonth(c *gin.Context) {
	id := c.Param("id")
	dateyearmonth := c.Param("dataanomes")
	dateStartRune := []rune(dateyearmonth)
	dateStart := string(dateStartRune[0:7])
	queryValores := "SUBSTRING(data_pagamento,1,7) = (?)  OR SUBSTRING(data_pagamento,1,7) < ?"
	var contas []models.ContasAPagars
	DB.Where("id", id).Preload("ValoresContasAPagar", queryValores, dateStart, dateStart).Find(&contas)

	for indexContas := 0; indexContas < len(contas); indexContas++ {
		contas[indexContas].ValoresContasAPagar = GetValuesBillsToPay(int(contas[indexContas].ID), dateStart)
	}

	c.JSON(http.StatusOK, gin.H{"data": contas})
}

func StoreBillsToPay(c *gin.Context) {
	tokenID := c.GetUint("id")
	var contas models.ContasAPagars

	if err := c.Bind(&contas); err != nil {
		fmt.Println(err)
		c.JSON(400, gin.H{
			"erro": err,
		})
	}

	contas.UserId = tokenID
	DB.Create(&contas)
	c.JSON(http.StatusCreated, gin.H{"data": contas})
}

// SelectAll return BillsToPay
func SelectAllBillsToPay(c *gin.Context) {
	var contas []models.ContasAPagars
	DB.Find(&contas)
	c.JSON(http.StatusOK, gin.H{"data": contas})
}

// Envio o ID e a DATA DE PAGAMENTO
// ATUALIZO A CONTAS A PAGAR NO ID
// VERIFICO SE EXISTE UMA CONTA USANDO O ID E A DATA DE PAGAMENTO
// SE NÂO TIVER EU INSIRO, SE TIVER EU ATUALIZO

func UpdateBillsToPay(c *gin.Context) {
	var contas models.ContasAPagars
	var valores models.ValoresContasAPagars
	dateyearmonth := c.Params.ByName("dataanomes")
	dateStartRune := []rune(dateyearmonth)
	dateStart := string(dateStartRune[0:7])
	id := helpers.StringToUint(c.Params.ByName("id"))

	DB.Where("id", id).Find(&contas)

	if errContas := c.BindJSON(&contas); errContas != nil {
		fmt.Println(errContas)
		c.JSON(400, gin.H{
			"erro": errContas,
		})
	}
	result := DB.Where("SUBSTRING(data_pagamento,1,7) = (?)", dateStart).Where("contas_a_pagar_id = ?", id).First(&valores).Error
	fmt.Println(errors.Is(result, gorm.ErrRecordNotFound))
	fmt.Println("dateyearmonth", dateyearmonth)
	if result != nil {
		contas.ValoresContasAPagar.DataPagamento = dateyearmonth
		valores.Valor = contas.ValoresContasAPagar.Valor
		valores.DataPagamento = dateyearmonth
		valores.ContasAPagarId = id
		DB.Create(&valores)
	} else {
		fmt.Println("dateStart", dateStart)
		DB.Model(&valores).Where("SUBSTRING(data_pagamento, 1, 7) = ?", dateStart).Where("contas_a_pagar_id = ?", id).Updates(&valores)
		DB.Save(&valores)
	}
	DB.Omit("ValoresContasAPagar").Save(&contas)
	c.JSON(http.StatusOK, gin.H{"data": contas})
}
