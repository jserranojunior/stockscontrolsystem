<template>
  <div class="flex flex-wrap ">
    <div class="w-full  ">
      <div class="w-full p-2">
        <div class="w-full bg-stone-600 p-1 rounded-md text-center font-bold text-sm  text-white">
          RENDIMENTOS
        </div>
        <div class="bg-base-300 rounded-lg shadow-xl p-4 mt-1">

          <div class="painel-body">
            <div class="flex flex-wrap justify-between text-center  text-sm" v-for="rendimento in rendimentos"
              :key="rendimento.conta">
              <div>{{ rendimento.conta }}</div>
              <div>{{ money(rendimento.valor) }}</div>
            </div>

          </div>
          <div class="flex justify-between mt-3  border-t pt-2">
            <div class="font-semibold">Total</div>
            <div class="font-semibold">{{ money(somaValores) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { money } from '../../../helpers/filters/filters';

const rendimentos = [
  { conta: "Nuconta", valor: 355 },
  { conta: "bitcoin", valor: 5 },
  { conta: "Ethereum", valor: 30 },
  { conta: "Imóveis", valor: 18 },
]
let somaValores = 0;

for (const rendimento of rendimentos) {
  somaValores += rendimento.valor;
}

</script>