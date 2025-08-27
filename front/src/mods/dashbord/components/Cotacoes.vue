<template>
  <div class="flex flex-wrap justify-center mx-2">
    <MoedaCotacao />
    <CriptCotacao />
    <MarketCotacao />
  </div>
</template>

<script setup lang="ts">
import { store } from "../composables/storeCotacoes";
import { onMounted, onUnmounted, ref } from "vue";

import { useMoedas } from "../composables/useMoedas";
import { useCripto } from "../composables/useCripto";
import { useMarket } from "../composables/useMarket";

import MoedaCotacao from "./MoedaCotacao.vue";
import CriptCotacao from "./CriptCotacao.vue";
import MarketCotacao from "./MarketCotacao.vue";

const { fetchForexRates } = useMoedas();
const { fetchCryptoRates } = useCripto();
const { fetchMarketRates } = useMarket();

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

const fetchRates = async () => {
  try {
    const cached = localStorage.getItem("cachedRates");
    const nowTime = Date.now();

    if (cached) {
      const parsed = JSON.parse(cached);
      const { timestamp, data } = parsed;

      if (nowTime - timestamp < CACHE_DURATION) {
        // Se o cache ainda estiver válido, atualiza o store diretamente
        Object.assign(store.rates, data);
        return;
      }
    }

    // Se cache expirado ou ausente, faz as requisições
    await fetchForexRates();
    await fetchCryptoRates();
    await fetchMarketRates();

    // Salva os dados no cache
    localStorage.setItem(
      "cachedRates",
      JSON.stringify({ timestamp: nowTime, data: store.rates })
    );
  } catch (error) {
    console.error("Erro ao buscar cotações:", error);
  }
};

const now = ref(new Date());
let interval: ReturnType<typeof setInterval>;
let fetchInterval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 1000);

  fetchRates(); // só irá buscar se não houver cache válido

  // opcional: atualiza os dados a cada 10 minutos também (além do cache)
  fetchInterval = setInterval(fetchRates, CACHE_DURATION);
});

onUnmounted(() => {
  clearInterval(interval);
  clearInterval(fetchInterval);
});
</script>
