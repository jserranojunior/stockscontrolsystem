<template>
  <div class="p-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    <div
      v-for="(corretora, index) in store.corretoras"
      :key="index"
      class="card bg-base-200 rounded-2xl p-1 shadow-lg"
    >
      <div class="bg-base-100 p-4 rounded-2xl">
        <h3 class="text-xl font-bold text-primary mb-2 flex items-center gap-2">
          <!-- Ícone do corretora -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M4 6h16M5 20h14M6 14h12"
            />
          </svg>
          {{ corretora.nome }}
        </h3>

        <p class="text-sm text-gray-500 mb-3">
          <strong>Data de Abertura:</strong> {{ formatarData(corretora.data) }}
        </p>
        <p class="text-sm text-gray-500 mb-3">
          <strong>Informações:</strong> {{ corretora.info }}
        </p>
        <p class="text-sm text-gray-500 mb-3">
          <strong>Moeda: </strong>
          <span class="font-bold text-black">{{ corretora.moeda }}</span>
        </p>
        <div class="text-sm mb-3">
          <div class="flex items-center gap-2">
            <strong>Cor: </strong>

            <span class="">{{ corretora.cor }}</span>
            <div
              class="h-4 w-4 rounded-full"
              :class="`bg-${corretora.cor}-500`"
            ></div>
          </div>
        </div>

        <div class="mt-2">
          <p class="text-sm font-semibold mb-1 text-gray-600">Ticks:</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tick in corretora.ticks"
              :key="tick"
              class="badge badge-outline"
            >
              {{ tick }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { store } from "../mods/tickers/composables/storeTicker";

function formatarData(dataISO: string): string {
  return new Date(dataISO).toLocaleDateString("pt-BR");
}
</script>
