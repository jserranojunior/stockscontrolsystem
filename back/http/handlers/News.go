package handlers

import (
	
	"encoding/json"
	
	"net/http"
	"os"
	
	"fmt"
	"github.com/gin-gonic/gin"
	"net/url"
)

type NewsResponse struct {
	Articles []struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Source      struct {
			Name string `json:"name"`
		} `json:"source"`
	} `json:"articles"`
}

func BuscarNoticias(ticker string) (string, []string, error) {
	apiKey := os.Getenv("NEWS_API_KEY")
	query, err := ChamarIAKeywords(ticker)
	if err != nil {
		query = ticker
	}

	apiURL := fmt.Sprintf("https://newsapi.org/v2/everything?q=%s&sortBy=relevancy&pageSize=15&language=en&apiKey=%s",
		url.QueryEscape(query), apiKey)

	resp, err := http.Get(apiURL)
	if err != nil {
		return "", nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", nil, fmt.Errorf("newsapi returned status: %d", resp.StatusCode)
	}

	var news NewsResponse
	if err := json.NewDecoder(resp.Body).Decode(&news); err != nil {
		return "", nil, err
	}

	noticiasConcatenadas := ""
	var fontes []string
	fonteMapa := make(map[string]bool)

	for _, art := range news.Articles {
		noticiasConcatenadas += art.Title + " " + art.Description + " | "
		if !fonteMapa[art.Source.Name] {
			fontes = append(fontes, art.Source.Name)
			fonteMapa[art.Source.Name] = true
		}
	}

	return noticiasConcatenadas, fontes, nil
}
func ExibirNoticias(c *gin.Context) {
    ticker := c.Param("ticker")
    
    // Agora BuscarNoticias faz todo o trabalho sujo de orquestração
    noticias, fontes, err := BuscarNoticias(ticker)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro: " + err.Error()})
        return
    }
    
    // Isso aqui é o que o navegador vai exibir!
    c.JSON(http.StatusOK, gin.H{
        "ativo":    ticker,
        "noticias": noticias,
        "fontes":   fontes,
    })
}