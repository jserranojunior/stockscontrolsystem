package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"
	"time"
	"fmt"
	"github.com/gin-gonic/gin"

)


func IAstatus(c *gin.Context) {
	// Certifique-se de definir esta variável de ambiente no seu servidor
	apiKey := os.Getenv("GROQ_API_KEY")
	if apiKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "GROQ_API_KEY não configurada"})
		return
	}

	// Endpoint oficial da API do Groq
	url := "https://api.groq.com/openai/v1/chat/completions"
	
	// Payload seguindo o formato OpenAI, que o Groq utiliza
	jsonPayload := []byte(`{
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": "Olá, como você pode ajudar um desenvolvedor?"}]
    }`)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar request"})
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	client := &http.Client{Timeout: 15 * time.Second}
	resp, err := client.Do(req)
	
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Falha na conexão com Groq", "details": err.Error()})
		return
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao ler resposta"})
		return
	}

	if resp.StatusCode != http.StatusOK {
		c.JSON(resp.StatusCode, gin.H{"error": "API do Groq retornou erro", "details": string(bodyBytes)})
		return
	}

	// Sucesso
	c.Data(http.StatusOK, "application/json", bodyBytes)
}

func ChamarIAKeywords(ticker string) (string, error) {
	apiKey := os.Getenv("GROQ_API_KEY")

	prompt := fmt.Sprintf(`Como especialista em mercado financeiro e SEO, gere uma query otimizada para a NewsAPI para o ticker "%s".
	Regras:
	1. Use apenas operadores lógicos básicos como OR.
	2. Inclua apenas termos técnicos, nomes de produtos recentes e nomes de executivos chave.
	3. Evite termos genéricos como "computação" ou "tecnologia".
	4. Responda APENAS com a string da query. Exemplo: "NVDA OR Nvidia OR Blackwell OR Jensen Huang".`, ticker)

	payload := map[string]interface{}{
		"model": "llama-3.3-70b-versatile",
		"messages": []map[string]interface{}{
			{"role": "user", "content": prompt},
		},
		"temperature": 0.3,
	}
	jsonPayload, _ := json.Marshal(payload)

	req, err := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(jsonPayload))
	if err != nil {
		return ticker, err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return ticker, err
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return ticker, err
	}

	var response map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &response); err != nil {
		return ticker, err
	}

	// Verificação de erro da API do Groq
	if errMsg, ok := response["error"]; ok {
		return ticker, fmt.Errorf("erro na API Groq: %v", errMsg)
	}

	// Verificação segura do slice "choices"
	choices, ok := response["choices"].([]interface{})
	if !ok || len(choices) == 0 {
		return ticker, fmt.Errorf("formato de resposta inesperado do Groq")
	}

	// Verificação segura da estrutura da mensagem
	firstChoice, ok := choices[0].(map[string]interface{})
	if !ok {
		return ticker, fmt.Errorf("erro ao ler a primeira escolha")
	}

	message, ok := firstChoice["message"].(map[string]interface{})
	if !ok {
		return ticker, fmt.Errorf("erro ao ler o campo message")
	}

	content, ok := message["content"].(string)
	if !ok {
		return ticker, fmt.Errorf("erro ao extrair conteúdo da mensagem")
	}

	return content, nil
}

func TestarKeywordsHandler(c *gin.Context) {
    ticker := c.Param("ticker")
    
    // Testa a geração de keywords
    keywords, err := ChamarIAKeywords(ticker)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao gerar keywords: " + err.Error()})
        return
    }
    
    // Retorna o resultado para você ver o que está sendo enviado para a NewsAPI
    c.JSON(http.StatusOK, gin.H{
        "ticker":   ticker,
        "keywords": keywords,
    })
}

func AnaliseAtivoHandler(c *gin.Context) {
	ticker := c.Param("ticker")
	apiKey := os.Getenv("GROQ_API_KEY")

	// 1. Busca as notícias usando o seu fluxo atual (que internamente usa ChamarIAKeywords)
	noticias, fontes, err := BuscarNoticias(ticker)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar notícias: " + err.Error()})
		return
	}
	if noticias == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Nenhuma notícia encontrada para " + ticker})
		return
	}

	// 2. Monta o prompt técnico para a IA
	promptContent := fmt.Sprintf("Analise o ativo %s com foco em tecnologia e mercado. Notícias: %s. Fontes consultadas: %v. Responda APENAS em JSON com os campos: sentimento, resumo, volatilidade, justificativa, fatos_chave.", ticker, noticias, fontes)

	payload := map[string]interface{}{
		"model": "llama-3.3-70b-versatile",
		"messages": []map[string]interface{}{
			{"role": "system", "content": "Você é um analista financeiro senior. Sua análise deve ser técnica, objetiva e baseada nos fatos fornecidos."},
			{"role": "user", "content": promptContent},
		},
		"response_format": map[string]interface{}{"type": "json_object"},
	}

	jsonPayload, _ := json.Marshal(payload)

	// 3. Executa a requisição ao Groq
	req, _ := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(jsonPayload))
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Erro de conexão com o Groq"})
		return
	}
	defer resp.Body.Close()

	// 4. Processa e exibe a análise final
	bodyBytes, _ := io.ReadAll(resp.Body)
	var groqResponse map[string]interface{}
	json.Unmarshal(bodyBytes, &groqResponse)

	choices := groqResponse["choices"].([]interface{})
	content := choices[0].(map[string]interface{})["message"].(map[string]interface{})["content"].(string)

	var analiseFinal map[string]interface{}
	json.Unmarshal([]byte(content), &analiseFinal)

	c.JSON(http.StatusOK, analiseFinal)
}