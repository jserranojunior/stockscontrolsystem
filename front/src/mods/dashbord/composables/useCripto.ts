import { toRefs } from "vue";
import { store } from "./storeCotacoes";

export const useCripto = () => {
  async function fetchCryptoRates() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl,usd&include_24hr_change=true"
      );
      if (!res.ok) throw new Error("Erro na API CoinGecko");
      const data = await res.json();

      store.rates.btc = data.bitcoin.brl;
      store.rates.btcusd = data.bitcoin.usd;
      store.rates.btcusdChange = data.bitcoin.usd_24h_change;

      store.rates.eth = data.ethereum.brl;
      store.rates.ethusd = data.ethereum.usd;
      store.rates.ethusdChange = data.ethereum.usd_24h_change;
    } catch (error) {
      console.error("Erro ao buscar cotações de criptomoedas:", error);
    }
  }

  return {
    ...toRefs(store),
    fetchCryptoRates,
  };
};
