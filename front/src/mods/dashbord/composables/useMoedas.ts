import { toRefs } from "vue";
import { store } from "./storeCotacoes";

// Utilitário para pegar a data de ontem no formato YYYY-MM-DD
function getYesterdayDate(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

export const useMoedas = () => {
  async function fetchForexRates() {
    try {
      const todayRes = await fetch(
        "https://api.frankfurter.app/latest?from=BRL&to=USD,EUR"
      );
      if (!todayRes.ok) throw new Error("Erro na API Frankfurter (hoje)");
      const todayData = await todayRes.json();

      const yesterdayDate = getYesterdayDate();
      const yesterdayRes = await fetch(
        `https://api.frankfurter.app/${yesterdayDate}?from=BRL&to=USD,EUR`
      );
      if (!yesterdayRes.ok) throw new Error("Erro na API Frankfurter (ontem)");
      const yesterdayData = await yesterdayRes.json();

      const usdbrlToday = Number((1 / todayData.rates.USD).toFixed(4));
      const eurbrlToday = Number((1 / todayData.rates.EUR).toFixed(4));
      const eurusdToday = Number(
        (todayData.rates.USD / todayData.rates.EUR).toFixed(5)
      );

      const usdbrlYesterday = Number((1 / yesterdayData.rates.USD).toFixed(4));
      const eurbrlYesterday = Number((1 / yesterdayData.rates.EUR).toFixed(4));
      const eurusdYesterday = Number(
        (yesterdayData.rates.USD / yesterdayData.rates.EUR).toFixed(5)
      );

      store.rates.usdbrl = usdbrlToday;
      store.rates.eurbrl = eurbrlToday;
      store.rates.eurusd = eurusdToday;

      store.rates.usdbrlChange = Number(
        (usdbrlToday - usdbrlYesterday).toFixed(4)
      );
      store.rates.eurbrlChange = Number(
        (eurbrlToday - eurbrlYesterday).toFixed(4)
      );
      store.rates.eurusdChange = Number(
        (eurusdToday - eurusdYesterday).toFixed(5)
      );
    } catch (error) {
      console.error("Erro ao buscar cotações de moedas fiat:", error);
    }
  }

  return {
    ...toRefs(store),
    fetchForexRates,
  };
};
