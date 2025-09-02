package handlers

import (
	"fmt"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jserranojunior/scs/back/models"
	"gorm.io/gorm"
)

type OperacaoDTO struct {
	ID                        uint      `json:"id"`
	Tick                      string    `json:"tick"`
	TipoOperacao              string    `json:"tipoOperacao"`
	Data                      time.Time `json:"data"`
	Quantidade                float64   `json:"quantidade"`
	ValorTotal                float64   `json:"valorTotal"`
	ValorUnidade              float64   `json:"valorUnidade"`
	PrecoMedio                float64   `json:"precoMedio"`
	Saldo                     float64   `json:"saldo"`
	Carteira                  float64   `json:"carteira"`
	PrecoAtual                float64   `json:"precoAtual"`
	DataAtualizacaoPrecoAtual time.Time `json:"dataAtualizacaoPrecoAtual"`
}

type CorretoraDTO struct {
	Nome      string        `json:"nome"`
	Cor       string        `json:"cor"`
	Operacoes []OperacaoDTO `json:"operacoes"`
}

// Use a variável global DB (definida em outro lugar)

func GetCorretoras(c *gin.Context) {
	var corretoras []models.Corretoras
	if err := DB.Preload("Tickers").Find(&corretoras).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, corretoras)
}

func GetCorretoraPorID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var corretora models.Corretoras
	if err := DB.Preload("Tickers").First(&corretora, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Corretora não encontrada"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, corretora)
}

func CriarCorretora(c *gin.Context) {
	var input struct {
		Nome  string `json:"nome" binding:"required"`
		Data  string `json:"data" binding:"required"`
		Info  string `json:"info"`
		Moeda string `json:"moeda" binding:"required"`
		Cor   string `json:"cor"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dataParsed, err := time.Parse("2006-01-02", input.Data)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data inválida, formato esperado YYYY-MM-DD"})
		return
	}

	corretora := models.Corretoras{
		Nome:  input.Nome,
		Data:  dataParsed,
		Info:  input.Info,
		Moeda: input.Moeda,
		Cor:   input.Cor,
	}

	if err := DB.Create(&corretora).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, corretora)
}

func AtualizarCorretora(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var input struct {
		Nome  string `json:"nome"`
		Data  string `json:"data"`
		Info  string `json:"info"`
		Moeda string `json:"moeda"`
		Cor   string `json:"cor"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var corretora models.Corretoras
	if err := DB.First(&corretora, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Corretora não encontrada"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if input.Nome != "" {
		corretora.Nome = input.Nome
	}
	if input.Data != "" {
		dataParsed, err := time.Parse("2006-01-02", input.Data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Data inválida, formato esperado YYYY-MM-DD"})
			return
		}
		corretora.Data = dataParsed
	}
	if input.Info != "" {
		corretora.Info = input.Info
	}
	if input.Moeda != "" {
		corretora.Moeda = input.Moeda
	}
	if input.Cor != "" {
		corretora.Cor = input.Cor
	}

	if err := DB.Save(&corretora).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, corretora)
}

func DeletarCorretora(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	if err := DB.Delete(&models.Corretoras{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}

func GetCorretorasComOperacoes(c *gin.Context) {
	tipocontabilidade := c.Param("tipocontabilidade")
	fmt.Println("tipocontabilidade =", tipocontabilidade)

	var corretoras []models.Corretoras

	// carrega tudo com operações ordenadas
	err := DB.Preload("Tickers.Operacoes", func(db *gorm.DB) *gorm.DB {
		return db.Order("operacoes.data ASC")
	}).Find(&corretoras).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var corretorasFiltradas []models.Corretoras

	for _, corretora := range corretoras {
		var tickersFiltrados []models.Tickers

		for _, ticker := range corretora.Tickers {
			if len(ticker.Operacoes) == 0 {
				continue
			}

			ultima := ticker.Operacoes[len(ticker.Operacoes)-1]

			switch tipocontabilidade {
			case "ativo":
				if ultima.SaldoTickers != 0 {
					tickersFiltrados = append(tickersFiltrados, ticker)
				}
			case "encerrado":
				if ultima.SaldoTickers == 0 {
					tickersFiltrados = append(tickersFiltrados, ticker)
				}
			}
		}

		// só adiciona corretora se tiver pelo menos 1 ticker válido
		if len(tickersFiltrados) > 0 {
			corretora.Tickers = tickersFiltrados
			corretorasFiltradas = append(corretorasFiltradas, corretora)
		}
	}

	c.JSON(http.StatusOK, corretorasFiltradas)
}

func GetCorretorasComOperacoesPerfomance(c *gin.Context) {
	// pega data da rota
	dataParam := c.Param("data")
	if dataParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Parâmetro 'data' é obrigatório no formato yyyy-mm-dd"})
		return
	}

	// converte string para time.Time
	data, err := time.Parse("2006-01-02", dataParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Formato de data inválido, use yyyy-mm-dd"})
		return
	}

	// cria intervalo do dia (00:00 até 23:59)
	inicio := data
	fim := data.Add(24 * time.Hour)

	var corretoras []models.Corretoras

	// busca corretoras, tickers e operações apenas do dia informado
	err = DB.Preload("Tickers.Operacoes", "data >= ? AND data < ?", inicio, fim).
		Find(&corretoras).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// monta DTO de resposta
	var resposta []CorretoraDTO
	for _, cor := range corretoras {
		corDTO := CorretoraDTO{
			Nome: cor.Nome,
			Cor:  cor.Cor,
		}

		for _, ticker := range cor.Tickers {
			for _, op := range ticker.Operacoes {
				opDTO := OperacaoDTO{

					Tick:                      ticker.Tick,
					TipoOperacao:              op.TipoOperacao,
					Data:                      op.Data,
					Quantidade:                op.Quantidade,
					ValorTotal:                op.ValorTotal,
					ValorUnidade:              op.ValorUnidade,
					PrecoMedio:                op.PrecoMedioCompra,
					Saldo:                     op.SaldoTickers,
					Carteira:                  op.Carteira,
					PrecoAtual:                ticker.PrecoAtual,
					DataAtualizacaoPrecoAtual: ticker.DataAtualizacaoPrecoAtual,
				}
				corDTO.Operacoes = append(corDTO.Operacoes, opDTO)
			}
		}

		resposta = append(resposta, corDTO)
	}

	// retorna JSON
	c.JSON(http.StatusOK, resposta)
}
func GetCorretorasUltimaOperacao(c *gin.Context) {
	var corretoras []models.Corretoras

	// busca corretoras + tickers + todas operações
	err := DB.Preload("Tickers.Operacoes").
		Find(&corretoras).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// monta DTO de resposta
	var resposta []CorretoraDTO
	for _, cor := range corretoras {
		corDTO := CorretoraDTO{
			Nome: cor.Nome,
			Cor:  cor.Cor,
		}

		for _, ticker := range cor.Tickers {
			if len(ticker.Operacoes) == 0 {
				continue
			}

			// ordena operações do ticker (mais recente primeiro)
			sort.Slice(ticker.Operacoes, func(i, j int) bool {
				return ticker.Operacoes[i].Data.After(ticker.Operacoes[j].Data)
			})

			// pega a última (mais recente)
			ultimaOp := ticker.Operacoes[0]

			// se saldo for zero, apenas ignora esse ticker
			if ultimaOp.SaldoTickers == 0 {
				continue
			}

			opDTO := OperacaoDTO{
				ID:                        ticker.ID,
				Tick:                      ticker.Tick,
				TipoOperacao:              ultimaOp.TipoOperacao,
				Data:                      ultimaOp.Data,
				Quantidade:                ultimaOp.Quantidade,
				ValorTotal:                ultimaOp.ValorTotal,
				ValorUnidade:              ultimaOp.ValorUnidade,
				PrecoMedio:                ultimaOp.PrecoMedioCompra,
				Saldo:                     ultimaOp.SaldoTickers,
				Carteira:                  ultimaOp.Carteira,
				PrecoAtual:                ticker.PrecoAtual,
				DataAtualizacaoPrecoAtual: ticker.DataAtualizacaoPrecoAtual,
			}

			corDTO.Operacoes = append(corDTO.Operacoes, opDTO)
		}

		// retorna a corretora mesmo que tenha zero ou mais operações válidas
		resposta = append(resposta, corDTO)
	}

	// retorna JSON
	c.JSON(http.StatusOK, resposta)
}
