import { toRefs } from "vue";
import { store } from "./storeCotacoes";

// Utilitário para pegar a data de ontem no formato YYYY-MM-DD
function getYesterdayDate(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

export const useCotacoes = () => {
  // Formata número em moeda BRL
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatNumber(value: number, decimals = 2): string {
    if (typeof value !== "number" || isNaN(value)) return "-";
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  function formatPercent(value: number): string {
    if (typeof value !== "number" || isNaN(value)) return "-";
    return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  }
  // Classe CSS para cor do texto conforme variação
  function getChangeClass(value: number): string {
    return value >= 0 ? "text-green-500" : "text-red-500";
  }

  return {
    ...toRefs(store),
    formatCurrency,
    formatNumber,
    formatPercent,
    getChangeClass,
  };
};
