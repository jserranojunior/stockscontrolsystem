package models

import (
	"time"

	"gorm.io/gorm"
)

type Operacoes struct {
	gorm.Model
	TickerID     uint      `gorm:"not null" json:"tickerId"`            // Relação com Tickers
	TipoOperacao string    `gorm:"size:1;not null" json:"tipoOperacao"` // "C" (compra) ou "V" (venda)
	Data         time.Time `gorm:"not null" json:"data"`
	Quantidade   float64   `gorm:"not null" json:"quantidade"`
	ValorTotal   float64   `gorm:"column:valor_total;not null" json:"valorTotal"` // Define explicitamente a coluna
	ValorUnidade float64   `gorm:"not null" json:"valorUnidade"`
	// Campos adicionais para cálculo
	PrecoMedioCompra float64 `gorm:"default:0" json:"precoMedioCompra"`
	SaldoTickers     float64 `gorm:"default:0" json:"saldoTickers"`
	Carteira         float64 `gorm:"default:0" json:"carteira"`

	Resultado float64 `gorm:"default:0" json:"resultado"`
	Lp        float64 `gorm:"default:0" json:"lp"`

	Ticker Tickers `gorm:"foreignKey:TickerID" json:"ticker,omitempty"`
}

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

// package models

// Estrutura para os dados agregados da Operação (com o Ticker)
type OperacaoAgrupadaDTO struct {
	ID               uint      `json:"id"`
	TipoOperacao     string    `json:"tipoOperacao"`
	Data             time.Time `json:"data"`
	Quantidade       float64   `json:"quantidade"`
	ValorTotal       float64   `json:"valorTotal"`
	ValorUnidade     float64   `json:"valorUnidade"`
	PrecoMedioCompra float64   `json:"precoMedioCompra"`
	SaldoTickers     float64   `json:"saldoTickers"`
	Carteira         float64   `json:"carteira"`
	Resultado        float64   `json:"resultado"`
	Lp               float64   `json:"lp"`
	Tick             string    `json:"tick"`

	// Campo que contém o Valor Atual do dia da operação (Mantido)
	ValorAtual float64 `json:"valorAtual"`

	// NOVO CAMPO: Valor Atual Mais Recente (valorAtualRecente)
	ValorAtualRecente float64 `json:"valorAtualRecente"`

	// NOVO CAMPO: Valor Investido (Valor Unidade da operação * Quantidade)
	Investido float64 `json:"investido"`

	// NOVO CAMPO: Posição (Valor Atual Recente * Quantidade)
	Posicao float64 `json:"posicao"`
}

type MesAgrupadoDTO struct {
	MesAno          string  `json:"mesAno"`
	TotalOperacoes  float64 `json:"totalOperacoes"`
	ResultadoMensal float64 `json:"resultadoMensal"`
	SomaInvestido   float64 `json:"somaInvestido"`
	SomaPosicao     float64 `json:"somaPosicao"`

	// NOVOS CAMPOS DE PERFORMANCE MENSAIS
	Performance float64 `json:"performance"` // Posição - Investido (Ganho absoluto)
	Variavel    float64 `json:"variavel"`    // Performance / Investido * 100 (Ganho percentual)

	Operacoes []OperacaoAgrupadaDTO `json:"operacoes"`
}

// Estrutura final para a Corretora
type CorretoraAgrupadaDTO struct {
	ID             uint    `json:"id"`
	Nome           string  `json:"nome"`
	Cor            string  `json:"cor"`
	Disponivel     float64 `json:"disponivel"`
	TotalGeral     float64 `json:"totalGeral"`
	ResultadoGeral float64 `json:"resultadoGeral"`
	TotalInvestido float64 `json:"totalInvestido"`
	TotalPosicao   float64 `json:"totalPosicao"`

	// NOVOS CAMPOS DE PERFORMANCE TOTAIS
	TotalPerformance float64 `json:"totalPerformance"` // Soma total da Performance (Ganho absoluto)
	TotalVariavel    float64 `json:"totalVariavel"`    // (TotalPerformance / TotalInvestido) * 100 (Ganho percentual total)

	Meses []MesAgrupadoDTO `json:"meses"`
}

// Estrutura auxiliar para o JOIN no GORM
// Esta struct carrega os campos brutos do banco (Operacao + Ticker + CorretoraID)
type OperacaoJoinResult struct {
	Operacoes
	Tick        string `gorm:"column:tick"`
	CorretoraID uint   `gorm:"column:corretora_id"`
	// NOVO CAMPO: Valor Atual do dia da operação
	ValorAtual float64 `gorm:"column:valorAtual"`
}
