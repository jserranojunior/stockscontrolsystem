<template>
  <div>
    <div class="p-6 flex justify-center items-center">
      <h1 class="text-3xl font-bold mb-6 text-center w-full">
        Relatório Semanal de Investimentos
      </h1>
    </div>



    <div class="flex flex-wrap justify-center p-2 "
      v-if="store.operacoesSemanaMes && store.operacoesSemanaMes.corretoras">
      <div v-for="corretora in store.operacoesSemanaMes.corretoras" :key="corretora.corretora_id"
        class="w-1/2 my-4  px-4 card shadow-xl rounded-2xl overflow-hidden">

        <div class="card-title p-1 text-base-100 text-center justify-center"
          :class="getBgClass(corretora.corretora_cor)">
          {{ corretora.corretora_nome }}
        </div>

        <div class="overflow-x-auto px-4 pb-4">
          <table class="table table-sm w-full text-xs bg-base-100">
            <thead class="text-black">
              <tr>
                <th>Data</th>
                <th class="text-right">Posição</th>
                <th class="text-right">Investido</th>
                <th class="text-right">Resultado</th>
                <th class="text-right">Variação</th>

              </tr>
            </thead>

            <tbody v-for="semana in ordenarSemanas(corretora.semanas)" :key="semana.semana">
              <tr>
                <td colspan="5" class="px-2 py-1 bg-gray-200 text-left">
                  <span class="font-semibold">
                    Semana {{ semana.semana === 0 ? 'Mês Anterior' : semana.semana }}
                  </span>
                </td>
              </tr>

              <tr v-for="dia in semana.dias" :key="dia.data">
                <td>{{ formatarData(dia.totais.data) }}</td>
                <td class="text-right" :class="{ 'text-red-500': dia.totais.posicao_dia < 0 }">{{
                  formatarMoeda(dia.totais.posicao_dia) }}</td>
                <td class="text-right" :class="{ 'text-red-500': dia.totais.investido_dia < 0 }">{{
                  formatarMoeda(dia.totais.investido_dia) }}</td>
                <td class="text-right" :class="{ 'text-red-500': dia.totais.resultado_dia < 0 }">{{
                  formatarMoeda(dia.totais.resultado_dia) }}</td>
                <td class="text-right" :class="{ 'text-red-500': dia.totais.variacao_dia < 0 }">{{
                  formatarMoeda(dia.totais.variacao_dia) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { store } from './composables/storeTicker'
import { useTicker } from './composables/useTicker'
import { formatarMoeda } from '../../helpers/mask/moneyMask'

const { getOperacoesSemanaMes } = useTicker()

onBeforeMount(() => {
  getOperacoesSemanaMes()
})

const getBgClass = (cor: string) => {
  return ({
    blue: "bg-blue-400",
    green: "bg-green-600",
    yellow: "bg-yellow-500",
  }[cor] || "bg-gray-600")
}

const formatarData = (dataString: string) => {
  // Corrige o problema do fuso horário
  // Adiciona 'T12:00:00' para forçar o horário do meio-dia e evitar problemas de timezone
  const data = new Date(dataString + 'T12:00:00')

  // Formata apenas o dia (2 dígitos)
  return data.getDate().toString().padStart(2, '0')
}

// Ordena semanas garantindo que a semana 0 fique primeiro
const ordenarSemanas = (semanas: any[]) => {
  if (!semanas) return []
  return [...semanas].sort((a, b) => a.semana - b.semana)
}
</script>