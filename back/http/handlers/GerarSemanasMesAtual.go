package handlers

import (
	"sort"
	"time"

	"github.com/gin-gonic/gin"
)

// ----------------------------------------------------------------------
// Tipos auxiliares para gerenciamento temporal
// ----------------------------------------------------------------------
type Semana struct {
	Numero int      `json:"semana"`
	Dias   []string `json:"dias"`
}

type Periodo struct {
	Inicio time.Time
	Fim    time.Time
}

// ----------------------------------------------------------------------
// Funções de gerenciamento temporal
// ----------------------------------------------------------------------

func GerarSemanasMesAtual() []Semana {
	now := time.Now()
	ano, mes, _ := now.Date()
	loc := now.Location()

	inicioMesAtual := time.Date(ano, mes, 1, 0, 0, 0, 0, loc)
	fimMesAtual := inicioMesAtual.AddDate(0, 1, -1)

	var semanas []Semana

	// Semana 0 - último dia útil do mês anterior
	semanaZero := criarSemanaZero(inicioMesAtual)
	semanas = append(semanas, semanaZero)

	// Semanas 1+ - dias úteis do mês atual
	semanasMesAtual := gerarSemanasMes(inicioMesAtual, fimMesAtual)

	// CORREÇÃO: Filtra novamente para garantir que só tem dias do mês atual
	for i := range semanasMesAtual {
		var diasFiltrados []string
		for _, dataStr := range semanasMesAtual[i].Dias {
			dia, _ := time.Parse("2006-01-02", dataStr)
			if dia.Month() == mes {
				diasFiltrados = append(diasFiltrados, dataStr)
			}
		}
		semanasMesAtual[i].Dias = diasFiltrados
	}

	semanas = append(semanas, semanasMesAtual...)

	return semanas
}

// Cria semana 0 com último dia útil do mês anterior
func criarSemanaZero(inicioMesAtual time.Time) Semana {
	ultimoDiaAnterior := inicioMesAtual.AddDate(0, 0, -1)
	for isFimDeSemana(ultimoDiaAnterior) {
		ultimoDiaAnterior = ultimoDiaAnterior.AddDate(0, 0, -1)
	}

	return Semana{
		Numero: 0,
		Dias:   []string{ultimoDiaAnterior.Format("2006-01-02")},
	}
}

// Gera semanas a partir de um período
func gerarSemanasMes(inicio, fim time.Time) []Semana {
	var semanas []Semana
	semanaAtual := Semana{Numero: 1}
	mesAtual := inicio.Month()

	for dia := inicio; !dia.After(fim); dia = dia.AddDate(0, 0, 1) {
		// Ignora fins de semana
		if isFimDeSemana(dia) {
			continue
		}

		// CORREÇÃO: Garante que só inclui dias do mês atual
		if dia.Month() != mesAtual {
			continue
		}

		// Se for segunda e já tem dias na semana → fecha a semana atual e inicia nova
		if dia.Weekday() == time.Monday && len(semanaAtual.Dias) > 0 {
			semanas = append(semanas, semanaAtual)
			semanaAtual = Semana{Numero: semanaAtual.Numero + 1}
		}

		// Adiciona dia útil (apenas do mês atual)
		semanaAtual.Dias = append(semanaAtual.Dias, dia.Format("2006-01-02"))
	}

	// Adiciona última semana se tiver dias (apenas do mês atual)
	if len(semanaAtual.Dias) > 0 {
		semanas = append(semanas, semanaAtual)
	}

	return semanas
}

// Verifica se é fim de semana
func isFimDeSemana(data time.Time) bool {
	return data.Weekday() == time.Saturday || data.Weekday() == time.Sunday
}

// Filtra apenas dias do mês atual
func FiltrarDiasMesAtual(dias []string) []string {
	var diasFiltrados []string
	mesAtual := time.Now().Month()

	for _, dataStr := range dias {
		dia, _ := time.Parse("2006-01-02", dataStr)
		if dia.Month() == mesAtual {
			diasFiltrados = append(diasFiltrados, dataStr)
		}
	}

	return diasFiltrados
}

// Ordena semanas por número
func OrdenarSemanas(semanasMap map[int]gin.H) []gin.H {
	var semanasArray []gin.H

	// Garante que a semana 0 sempre existe, mesmo que vazia
	if _, existe := semanasMap[0]; !existe {
		semanasMap[0] = gin.H{
			"semana": 0,
			"dias":   []gin.H{},
		}
	}

	// Correção: usar apenas a variável semana
	for _, semana := range semanasMap {
		semanasArray = append(semanasArray, semana)
	}

	sort.Slice(semanasArray, func(i, j int) bool {
		return semanasArray[i]["semana"].(int) < semanasArray[j]["semana"].(int)
	})

	return semanasArray
}

// Obtém período do mês atual
func ObterPeriodoMesAtual() Periodo {
	now := time.Now()
	inicio := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())
	fim := inicio.AddDate(0, 1, -1)
	return Periodo{Inicio: inicio, Fim: fim}
}

// Obtém último dia do mês anterior
func ObterUltimoDiaMesAnterior() time.Time {
	now := time.Now()
	inicioMesAtual := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())
	return inicioMesAtual.AddDate(0, 0, -1)
}
