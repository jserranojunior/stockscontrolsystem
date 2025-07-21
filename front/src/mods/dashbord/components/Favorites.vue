<template>
  <div class="flex flex-wrap justify-center gap-4">
    <div
      v-for="section in favorites"
      :key="section.category"
      class="xs:w-1/3 p-2 sm:w-full md:w-1/3"
    >
      <div class="card bg-base-200 shadow-xl h-full">
        <div class="card-body p-3">
          <h2 class="card-title justify-center text-md">
            {{ section.category }}
          </h2>
          <div class="flex flex-wrap text-center">
            <div
              v-for="fav in section.items"
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const favorites = ref([
  {
    category: "Corretoras",
    items: [
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
    ],
  },
  {
    category: "Notícias",
    items: [
      {
        name: "Wall Street Journal",
        url: "https://www.wsj.com/",
        description: "Notícias financeiras e análises de mercado.",
      },
      {
        name: "B3 - Bolsa de Valores",
        url: "https://www.b3.com.br/",
        description: "Informações sobre ações, ETFs e mercado financeiro.",
      },
    ],
  },
  {
    category: "Análise Técnica",
    items: [
      {
        name: "TradingView Brasil",
        url: "https://br.tradingview.com/",
        description: "Gráficos e análise técnica para traders e investidores.",
      },
    ],
  },
  {
    category: "Redes Sociais",
    items: [
      {
        name: "Twitter (X)",
        url: "https://x.com/",
        description:
          "Rede social para acompanhar notícias e opiniões em tempo real.",
      },
    ],
  },
]);
</script>
