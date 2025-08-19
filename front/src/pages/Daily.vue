<template>
  <Tabs />
  <div class="flex justify-between mt-6">
    <div class="w-1/3"></div>
    <div class="w-1/3">
      <Calendario />
    </div>

    <div class="w-auto mr-6">
      <div class="text-right btn btn-sm btn-primary" v-if="!openNewCompra" @click="toggleNewCompra">
        Registrar Compra
      </div>
    </div>
  </div>
  <div class="flex justify-end m-4">
    <div class="text-right btn btn-warning" v-if="openNewCompra" @click="toggleNewCompra">
      Fechar
    </div>
  </div>

  <div v-if="openNewCompra">
    <addNewDailyAction />
  </div>
  <div v-if="!openNewCompra" id="performance">
    <Performance />
  </div>
  <div v-if="!openNewCompra" id="relatorio-diario">
    <RelatorioDiario />
  </div>
  <div v-if="!openNewCompra" id="resumo">
    <Resumo />
  </div>
  <div v-if="!openNewCompra" id="resumo-dolar">
    <ResumoDolar />
  </div>
  <div v-if="!openNewCompra" id="resultado-mensal">
    <ResultadoMensal />
  </div>
</template>
<script setup lang="ts">
import Tabs from "../mods/tickers/components/Tabs.vue";
import addNewDailyAction from "../mods/tickers/addNewDailyAction.vue";
import Performance from "../mods/tickers/Performance.vue";
import RelatorioDiario from "../mods/tickers/RelatorioDiario.vue";
import { ref } from "vue";
import ResultadoMensal from "../mods/tickers/ResultadoMensal.vue";
import Resumo from "../mods/tickers/Resumo.vue";
import ResumoDolar from "../mods/tickers/ResumoDolar.vue";
import Calendario from "../components/Calendario/Calendario.vue";
const openNewCompra = ref(false);

function toggleNewCompra() {
  openNewCompra.value = !openNewCompra.value;
}
</script>
