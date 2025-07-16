<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <div class="w-full p-2">
        <div
          class="w-full bg-purple-600 p-1 rounded-md text-center font-bold text-sm text-white"
        >
          INVESTIMENTOS
        </div>
        <div class="bg-base-300 rounded-lg shadow-xl p-4 mt-1">
          <div class="painel-body">
            <div
              class="flex flex-wrap justify-between text-center text-sm"
              v-for="investimento in investimentos"
              :key="investimento.conta"
            >
              <div>{{ investimento.conta }}</div>
              <div>{{ money(investimento.valor) }}</div>
            </div>
          </div>
          <div class="flex justify-between mt-3 border-t pt-2">
            <div class="font-semibold">Total</div>
            <div class="font-semibold">{{ money(somaValores) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { money } from "../../../helpers/filters/filters";

const investimentos = [
  { conta: "Nuconta", valor: 59330 },
  { conta: "bitcoin", valor: 120 },
  { conta: "Ethereum", valor: 660 },
  { conta: "Imóveis", valor: 1050 },
];
let somaValores = 0;

for (const investimento of investimentos) {
  somaValores += investimento.valor;
}
</script>
