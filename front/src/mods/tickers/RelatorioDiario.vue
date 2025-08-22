<template>
  <div>
    <div class="p-6 flex justify-center items-center">
      <h1 class="text-3xl font-bold mb-6 text-center w-full">
        Relatório Semanal de Investimentos
      </h1>
    </div>





    <div class="flex flex-wrap justify-center  p-2">
      <div v-for="corretora in store.operacoesSemanaMes.dadosPorCorretora" :key="corretora.corretoraId"
        class="w-1/4 mx-1 card shadow-xl rounded-2xl overflow-hidden">
        <!-- Cabeçalho -->
        <div class="card-title p-1 text-base-100 text-center justify-center"
          :class="getBgClass(corretora.corretoraCor)">
          {{ corretora.corretoraNome }}
        </div>

        <!-- Total Mensal -->
        <div class="p-4 text-right text-2xl font-bold">
          {{ corretora.totalMensal.toFixed(2) }}
        </div>

        <!-- Tabela -->
        <div class="overflow-x-auto px-4 pb-4">
          <table class="table table-sm w-full text-xs bg-base-100">
            <thead class="text-black">
              <tr>
                <th>Data</th>
                <th>Fechamento</th>
                <th>Evolução</th>
                <th>Retirada</th>
              </tr>
            </thead>

            <tbody v-for="semana in corretora.semanas" :key="semana.semana">
              <!-- Cabeçalho da semana -->
              <tr>
                <td class="px-2 py-1 bg-gray-200  text-left">
                  <span class="font-semibold">Semana {{ semana.semana }}</span>
                </td>
              </tr>

              <!-- Dias -->
              <tr v-for="dia in semana.dias" :key="dia.data">
                <td>{{ dia.data }}</td>
                <td>{{ dia.fechamento.toFixed(2) }}</td>
                <td class="bg-gray-100">0,00</td>
                <td>0</td>
              </tr>

              <!-- Totais -->
              <tr>
                <td class="px-2 py-1 font-semibold">Total</td>
                <td></td>
                <td class="px-2 py-1 text-right font-semibold text-blue-800 bg-gray-100">
                  <div v-if="semana.totalSemana">{{ semana.totalSemana.toFixed(2) }}</div>
                </td>
                <td class="px-2 py-1 text-right font-semibold text-red-800">
                  {{ semana.quantSemana }}
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
    <!-- 
    <pre>
{{ store.operacoesSemanaMes.dadosPorCorretora }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { store } from './composables/storeTicker'
import { useTicker } from './composables/useTicker'
const { getOperacoesSemanaMes } = useTicker()

onBeforeMount(() => {
  // Carregar dados iniciais
  // getOperacoesSemanaMes()
})

// dentro do <script setup>
const getBgClass = (cor: string) => {
  return (
    {
      blue: "bg-blue-400",
      green: "bg-green-600",
      yellow: "bg-yellow-500",
    }[cor] || "bg-gray-600"
  ); // fallback
};


</script>
