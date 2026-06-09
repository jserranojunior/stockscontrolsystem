<template>

   <div class="flex justify-center ">
    <h5 class="text-xl font-bold text-gray-800 pt-6">Selecione um ativo</h5>
   </div>

<div class="flex justify-center pb-6 pt-2">
  <select class="select select-bordered w-full max-w-xs focus:ring-2 focus:ring-primary bg-white text-gray-900" v-model="tickerSelecionado">
    <option disabled selected>Selecione um ativo</option>
    <option 
      v-for="(ticker, index) in allTickers" 
      :key="index" 
      :value="ticker.tick"
      class="bg-white text-gray-900"
    >
      {{ ticker.tick }} {{ ticker.name?.String ? `- ${ticker.name.String}` : '' }}
    </option>
  </select>
</div>

  <div class="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen" v-if="tickerSelecionado">
    <div v-if="analiseAtivo" class="space-y-6">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 class="text-sm text-gray-500 uppercase font-bold">Sentimento</h3>
          <p class="text-2xl font-bold text-green-600">{{ analiseAtivo.sentimento }}</p>
        </div>
        <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 class="text-sm text-gray-500 uppercase font-bold">Volatilidade</h3>
          <p class="text-2xl font-bold text-orange-500">{{ analiseAtivo.volatilidade }}</p>
        </div>
      </div>

      <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 class="text-xl font-bold mb-2">Resumo de Mercado</h2>
        <p class="text-gray-700 leading-relaxed">{{ analiseAtivo.resumo }}</p>
      </div>

      <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 class="text-xl font-bold mb-4">Eventos Principais</h2>
        <ul class="space-y-3">
          <li v-for="(fato, index) in analiseAtivo.fatos_chave" :key="index" class="flex items-start">
            <span class="mr-2 text-blue-500">•</span>
            <span class="text-gray-700">{{ fato }}</span>
          </li>
        </ul>
      </div>

      <div class="p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h2 class="text-lg font-bold text-blue-900 mb-2">Análise Técnica</h2>
        <p class="text-blue-800 italic">{{ analiseAtivo.justificativa }}</p>
      </div>

    </div>

    <div v-else class="text-center py-20 text-gray-400">
      Carregando análise do ativo...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, watch } from "vue";
import { useIA } from "../mods/ia/composables/useIA";
import {useTicker} from "../mods/tickers/composables/useTicker";
const {getAllTickers, allTickers} = useTicker();
const { GetAnaliseAtivo, analiseAtivo, tickerSelecionado } = useIA();

onBeforeMount(async () => {

  await getAllTickers();
  console.log(allTickers.value);
});

watch(tickerSelecionado, async (newTicker) => {
  if (newTicker) {
    await GetAnaliseAtivo();
  }
});
</script>