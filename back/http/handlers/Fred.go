package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

const fredAPIKey = "8294a46fb101bb1fdb97f40e6da95af4"

type FredObservation struct {
	Date  string  `json:"date"`
	Value float64 `json:"value,string"`
}

type FredResponse struct {
	Observations []FredObservation `json:"observations"`
}

type YieldData struct {
	SeriesID      string  `json:"series_id"`
	LatestValue   float64 `json:"latest_value"`
	PreviousValue float64 `json:"previous_value"`
	Change        float64 `json:"change"`
	ChangePct     float64 `json:"change_percent"`
}

func fetchFredYield(seriesID string) (*YieldData, error) {
	url := fmt.Sprintf("https://api.stlouisfed.org/fred/series/observations?series_id=%s&api_key=%s&file_type=json&sort_order=desc&limit=2", seriesID, fredAPIKey)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("status %d fetching %s", resp.StatusCode, seriesID)
	}

	var fredResp FredResponse
	if err := json.NewDecoder(resp.Body).Decode(&fredResp); err != nil {
		return nil, err
	}

	if len(fredResp.Observations) < 2 {
		return nil, fmt.Errorf("not enough observations for %s", seriesID)
	}

	latest := fredResp.Observations[0]
	previous := fredResp.Observations[1]

	change := latest.Value - previous.Value
	changePct := 0.0
	if previous.Value != 0 {
		changePct = (change / previous.Value) * 100
	}

	return &YieldData{
		SeriesID:      seriesID,
		LatestValue:   latest.Value,
		PreviousValue: previous.Value,
		Change:        change,
		ChangePct:     changePct,
	}, nil
}

func FredYieldsHandler(c *gin.Context) {
	seriesIDs := []string{"DGS2", "DGS10", "DGS20", "DGS30"}

	var wg sync.WaitGroup
	results := make([]*YieldData, len(seriesIDs))
	errors := make([]error, len(seriesIDs))

	for i, id := range seriesIDs {
		wg.Add(1)
		go func(i int, seriesID string) {
			defer wg.Done()
			data, err := fetchFredYield(seriesID)
			results[i] = data
			errors[i] = err
		}(i, id)
	}

	wg.Wait()

	for i, err := range errors {
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": fmt.Sprintf("Erro ao buscar dados para %s: %v", seriesIDs[i], err),
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"yields": results,
	})
}
