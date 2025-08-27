import { toRefs } from "vue";
import { store } from "./storeCotacoes";

const BACKEND_FRED_URL = "https://backscs.alvitre.com.br/api/fred"; // ajuste para sua URL do backend

export const useMarket = () => {
  async function fetchMarketRates() {
    try {
      const res = await fetch(BACKEND_FRED_URL);
      if (!res.ok)
        throw new Error("Erro ao buscar dados de mercado do backend FRED");
      const data = await res.json();

      // data.yields é um array com objetos {series_id, latest_value, previous_value, change, change_percent}
      for (const yieldData of data.yields) {
        if (yieldData.series_id === "DGS2") {
          store.rates.us02y = yieldData.latest_value;
          store.rates.us02yChange = yieldData.change;
          store.rates.us02yChangePercent = yieldData.change_percent;
        } else if (yieldData.series_id === "DGS10") {
          store.rates.us10y = yieldData.latest_value;
          store.rates.us10yChange = yieldData.change;
          store.rates.us10yChangePercent = yieldData.change_percent;
        } else if (yieldData.series_id === "DGS20") {
          store.rates.us20y = yieldData.latest_value;
          store.rates.us20yChange = yieldData.change;
          store.rates.us20yChangePercent = yieldData.change_percent;
        } else if (yieldData.series_id === "DGS30") {
          store.rates.us30y = yieldData.latest_value;
          store.rates.us30yChange = yieldData.change;
          store.rates.us30yChangePercent = yieldData.change_percent;
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados de mercado (backend FRED):", error);
    }
  }

  return {
    ...toRefs(store),
    fetchMarketRates,
  };
};
