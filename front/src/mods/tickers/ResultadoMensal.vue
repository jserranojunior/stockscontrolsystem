<template>
  <div class="p-6 flex justify-center items-center">
    <h1 class="text-3xl font-bold mb-6 text-center w-full">
      Resultado Anual 2025
    </h1>
  </div>

  <div class="flex flex-wrap justify-center p-1 mx-1">




    <!-- Tabela Nomade -->
    <div class="w-full max-w-3xl mx-2 card shadow-xl p-0 m-0 rounded-2xl mb-10"
      v-for="corretora in store.operacoesMesAMes" :key="corretora.id">
      <div class="card-body p-0 m-0 rounded-2xl">
        <h2 class="card-title p-3 m-0 text-white rounded-t-2xl  text-center justify-center text-lg"
          :class="getBgClass(corretora.cor)">
          RESUMO ANUAL - {{ corretora.nome }}
        </h2>

        <div class="w-full overflow-x-auto px-4 py-2">
          <table class="table w-full text-sm bg-base-100">
            <thead class="text-black bg-gray-100">
              <tr>
                <th class="text-left">Mês</th>
                <th class="text-right bg-blue-400">Investido</th>
                <th class="text-right">Posição</th>
                <th class="text-right bg-yellow-100">Ret/Dep</th>
                <th class="text-right">Performance</th>
                <th class="text-right">Variavel</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(meses, index) in corretora.meses" :key="'nomade' + index" class="hover:bg-gray-50">
                <td class="font-medium">{{ meses.mesAno }}</td>
                <td class="text-right" :class="{ 'text-red-500': meses.somaInvestido < 0 }">{{
                  formatarMoeda(meses.somaInvestido) }}</td>
                <td class="text-right" :class="{ 'text-red-500': meses.somaPosicao < 0 }">{{
                  formatarMoeda(meses.somaPosicao) }}</td>
                <td class="text-right">
                  {{ formatarMoeda(0) }}
                </td>
                <td class="text-right font-medium" :class="{ 'text-red-500': meses.performance < 0 }">
                  {{ formatarMoeda(meses.performance) }}
                </td>
                <td class="text-right font-medium" :class="{ 'text-red-500': meses.variavel < 0 }">
                  {{ formatarMoeda(meses.variavel) }}%
                </td>
              </tr>

              <!-- Total Nomade -->
              <tr class="bg-gray-100 font-bold">
                <td class="text-left">Atual</td>
                <td class="text-right bg-blue-400" :class="{ 'text-red-500': corretora.totalInvestido < 0 }">{{
                  formatarMoeda(corretora.totalInvestido) }}</td>
                <td class="text-right" :class="{ 'text-red-500': corretora.totalPosicao < 0 }">{{
                  formatarMoeda(corretora.totalPosicao) }}</td>
                <td class="text-right bg-yellow-50">{{ formatarMoeda(0) }}</td>
                <td class="text-right" :class="{ 'text-red-500': corretora.totalPerformance < 0 }">{{
                  formatarMoeda(corretora.totalPerformance) }}</td>
                <td class="text-right" :class="{ 'text-red-500': corretora.totalVariavel < 0 }">{{
                  formatarMoeda(corretora.totalVariavel) }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { store } from "./composables/storeTicker";
import { useTicker } from "./composables/useTicker";
const { getOperacoesMesAMes } = useTicker();
import { formatarMoeda } from '../../helpers/mask/moneyMask'


const monthlyData = [
  {
    name: "Jan",
    xp: "142.413,07",
    genial: "297.172,42",
    nomade: "100.000,00",
    resultado31: "107.500,00",
    retDep: "5.000,00",
    resultValue: "12.500,00",
    resultPercent: "12,50%",
    saldo: "439.585,49",
  },
  {
    name: "Fev",
    xp: "127.356,19",
    genial: "254.355,01",
    nomade: "107.500,00",
    resultado31: "106.000,00",
    retDep: "",
    resultValue: "-1.500,00",
    resultPercent: "-1,40%",
    saldo: "374.240,19",
  },
  {
    name: "Mar",
    xp: "122.229,23",
    genial: "226.248,67",
    nomade: "106.000,00",
    resultado31: "104.000,00",
    retDep: "",
    resultValue: "-2.000,00",
    resultPercent: "-1,89%",
    saldo: "348.477,90",
  },
  {
    name: "Apr",
    xp: "108.052,78",
    genial: "201.448,38",
    nomade: "104.000,00",
    resultado31: "110.000,00",
    retDep: "3.000,00",
    resultValue: "9.000,00",
    resultPercent: "8,65%",
    saldo: "309.501,16",
  },
  {
    name: "Mai",
    xp: "126.267,37",
    genial: "218.014,88",
    nomade: "110.000,00",
    resultado31: "120.000,00",
    retDep: "2.000,00",
    resultValue: "12.000,00",
    resultPercent: "10,91%",
    saldo: "344.282,25",
  },
  {
    name: "Jun",
    xp: "155.374,00",
    genial: "257.574,50",
    nomade: "120.000,00",
    resultado31: "121.000,00",
    retDep: "",
    resultValue: "1.000,00",
    resultPercent: "0,83%",
    saldo: "412.948,50",
  },
  {
    name: "Jul",
    xp: "153.576,39",
    genial: "257.744,00",
    nomade: "121.000,00",
    resultado31: "119.000,00",
    retDep: "",
    resultValue: "-2.000,00",
    resultPercent: "-1,65%",
    saldo: "411.320,39",
  },
]


function getValueClass(value: any) {
  const num = parseFloat(value?.replace(".", "").replace(",", ".") || 0);
  return num >= 0 ? "text-green-600" : "text-red-600";
}
function getPercentClass(percent: any) {
  if (!percent) return "";
  return percent.includes("-") ? "text-red-600" : "text-green-600";
}

onBeforeMount(async () => {
  await getOperacoesMesAMes();
});

const getBgClass = (cor: string) => {
  return ({
    blue: "bg-blue-400",
    green: "bg-green-600",
    yellow: "bg-yellow-500",
  }[cor] || "bg-gray-600")
}
</script>

<style scoped>
.table th,
.table td {
  padding: 0.5rem 0.75rem;
}

.table tr:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}
</style>
