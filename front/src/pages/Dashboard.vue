<template>
  <div class="flex flex-wrap justify-center items-center my-4">
    <Cotacoes></Cotacoes>
  </div>

  <div class="flex justify-center">
    <!-- Card de Horários -->
    <Hora></Hora>
    <!-- Calendário -->

    <div class="xs:w-1/3 p-2 sm:w-full md:w-1/3">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body p-3">
          <h2 class="card-title justify-center text-md">Favoritos</h2>
          <div class="flex flex-wrap text-center">
            <div
              v-for="fav in favorites"
              :key="fav.url"
              class="p-2 rounded-lg bg-base-100 w-full cursor-pointer hover:bg-base-300 transition"
            >
              <a
                :href="fav.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block"
              >
                <p class="font-semibold text-blue-600 hover:underline">
                  {{ fav.name }}
                </p>
                <p class="text-sm text-gray-600">{{ fav.description }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="items-center align-middle">
      <Calculadora />
    </div>
  </div>

  <div class="flex flex-wrap justify-center">
    <!-- Card Favoritos -->

    <!-- Conversores -->
    <div class="w-full md:w-2/8 p-4">
      <DolarConversor :usdRate="rates.usdbrl" />
    </div>
    <div class="w-full md:w-2/8 p-4">
      <EuroConversor :eurRate="rates.eurbrl" />
    </div>

    <div class="w-full xs:w-2/6 p-2 sm:w-full md:w-2/6">
      <Calendario />
    </div>
  </div>
  <div class="flex justify-center items-center flex-wrap"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import EuroConversor from "../mods/dashbord/components/EuroConversor.vue";
import DolarConversor from "../mods/dashbord/components/DolarConversor.vue";
import Calendario from "../mods/dashbord/components/Calendario.vue";
import Calculadora from "../mods/dashbord/calculadora/Calculadora.vue";
import Cotacoes from "../mods/dashbord/components/Cotacoes.vue";
import Hora from "../mods/dashbord/components/Hora.vue";
import { useCotacoes } from "../mods/dashbord/composables/useCotacoes";
const { rates } = useCotacoes();
// Favoritos
const favorites = ref([
  {
    name: "TradingView Brasil",
    url: "https://br.tradingview.com/",
    description: "Gráficos e análise técnica para traders e investidores.",
  },
  {
    name: "Wall Street Journal",
    url: "https://www.wsj.com/",
    description: "Notícias financeiras e análises de mercado.",
  },
  {
    name: "XPI Investimentos",
    url: "https://www.xpi.com.br/plataformas/",
    description: "Plataformas completas para investimentos financeiros.",
  },
  {
    name: "Genial Investimentos",
    url: "https://www.genialinvestimentos.com.br/",
    description: "Investimentos, renda fixa, ações e muito mais.",
  },
  {
    name: "Nomad Global",
    url: "https://www.nomadglobal.com/investimentos",
    description: "Investimentos internacionais e globalização financeira.",
  },
  {
    name: "B3 - Bolsa de Valores",
    url: "https://www.b3.com.br/",
    description: "Informações sobre ações, ETFs e mercado financeiro.",
  },
]);
</script>
