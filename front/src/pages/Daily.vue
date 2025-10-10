<template>
  <div>
    <Tabs />
    <div class="flex justify-between mt-6">
      <div class="w-1/3"></div>


    </div>


    <div id="performance">
      <Performance />
    </div>
    <div id="relatorio-diario">
      <RelatorioSemanal />
    </div>
    <!--  <div id="resumo">
      <Resumo />
    </div>
    <div id="resumo-dolar">
      <ResumoDolar />
    </div> -->
    <div id="resultado-mensal">
      <ResultadoMensal />
    </div>

  </div>

</template>
<script setup lang="ts">
import Tabs from "../mods/tickers/components/Tabs.vue";
import Performance from "../mods/tickers/Performance.vue";
import RelatorioSemanal from "../mods/tickers/RelatorioSemanal.vue";

import ResultadoMensal from "../mods/tickers/ResultadoMensal.vue";
import Resumo from "../mods/tickers/Resumo.vue";
import ResumoDolar from "../mods/tickers/ResumoDolar.vue";

</script>
