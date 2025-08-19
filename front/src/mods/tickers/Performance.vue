<template>
  <div class="p-6 flex justify-center items-center">
    <div class="w-full">
      <h1 class="text-3xl font-bold my-4 text-center">
        Performance de Investimentos
      </h1>
    </div>
  </div>
  <div class="flex flex-wrap justify-center p-1">
    <div class="w-full max-w-6xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <!-- Loop através das corretoras -->

        <div v-for="corretora in store.ativos" :key="corretora.ID"
          class="w-full card shadow-xl m-0 rounded-2xl mb-10 p-2">
          <div class="card-body p-0 m-0 rounded-2xl" v-if="corretora.nome">
            <h2 class="card-title p-1 m-0 text-white rounded-t-2xl text-center justify-center"
              :class="getBgClass(corretora.cor)">
              {{ corretora.nome }}
            </h2>

            <div class="w-full overflow-x-auto">
              <table class="table table-xs w-full min-w-[800px] text-sm bg-base-100">
                <thead class="text-black">
                  <tr>
                    <td colspan="5" class="text-center bg-yellow-100">
                      INVESTIDO
                    </td>
                    <td class="text-center mx-auto">
                      <div class="px-2 w-2">|</div>
                    </td>
                    <td colspan="6" class="text-center bg-blue-200">
                      PERFORMANCE
                    </td>
                  </tr>
                  <tr class="text-xs uppercase tracking-wide">
                    <th></th>
                    <th class="text-center" title="Nome do ativo">ATIVOS</th>
                    <th class="text-right" title="Valor investido">
                      Investido
                    </th>

                    <th class="text-right" title="Quantidade de ativos em carteira">
                      STOCKS
                    </th>
                    <th class="text-right" title="Preço Médio (Valor Médio)">
                      PMC
                    </th>
                    <th class="text-center mx-auto">
                      <div class="px-2 w-2">|</div>
                    </th>
                    <th class="text-left" title="Preço atual do ativo no final dia">
                      P. Atual
                    </th>
                    <th class="text-right" title="Valor total do ativo no final do dia">
                      Posição
                    </th>

                    <th class="text-right"
                      title="Lucro ou prejuízo acumulado + Variação percentual entre preço médio e valor atual">
                      Performance
                    </th>

                    <th class="text-right" title="Variação percentual entre preço médio e valor atual">
                      Var %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Saldo em conta corrente -->

                  <!-- Categorias de ativos -->
                  <tr v-for="categoria in corretora.categorias" :key="categoria.nome"
                    class="bg-gray-200 font-semibold text-xs tracking-wide">
                    <td colspan="10" class="py-2 px-3">
                      {{ categoria.nome }} {{ categoria.percentual }}%
                    </td>
                  </tr>

                  <!-- Ativos -->

                  <tr v-for="operacoes in corretora.operacoes" :key="operacoes.codigo" class="bg-gray-300 transition">
                    <td></td>
                    <td class="text-center font-bold">{{ operacoes.tick }}</td>
                    <td class="text-right font-medium">
                      {{ formatarNumero(operacoes.valorTotal) }}
                    </td>

                    <td class="text-right">{{ operacoes.quantidade }}</td>
                    <td class="text-right">
                      {{ formatarNumero(operacoes.precoMedio) }}
                    </td>
                    <th class="text-center mx-auto">
                      <div class="px-2 w-2">|</div>
                    </th>
                    <td class="text-left">
                      {{ formatarNumero(operacoes.precoAtual) }}
                    </td>
                    <td class="text-right">
                      {{ formatarNumero(operacoes.posicao) }}
                    </td>

                    <td class="text-right">
                      {{ formatarNumero(operacoes.performance) }}
                    </td>

                    <td class="text-right">
                      {{ operacoes.variacaoPercentual }}%
                    </td>
                  </tr>

                  <!-- Total Diário -->
                  <tr class="bg-gray-200 font-semibold">
                    <td title="Movimentação diaria">Total Diário</td>
                    <td></td>
                    <td class="text-right">
                      <!-- {{ formatCurrency(corretora.totalDiario.valorDiario) }} -->
                    </td>

                    <td></td>
                    <td></td>
                    <th class="text-center mx-auto">
                      <div class="px-2 w-2">|</div>
                    </th>
                    <td></td>
                    <td class="text-right">
                      <!--  {{ formatCurrency(corretora.totalDiario.valorComprado) }} -->
                    </td>

                    <td class="text-right">
                      <!-- {{ formatCurrency(corretora.totalDiario.performance) }} -->
                    </td>

                    <td class="text-right">
                      <!-- {{ corretora.totalDiario.variacaoPercentual }}% -->
                    </td>
                  </tr>

                  <!-- Total Corretora -->
                  <tr class="bg-gray-200 font-bold text-sm">
                    <td title="Total Dia Anterior - Final do dia">
                      Total {{ corretora.nome.split(" ")[0] }}
                    </td>
                    <td></td>
                    <td class="text-right">
                      <!-- {{ formatCurrency(corretora.totalCorretora.valorDiario) }} -->
                    </td>

                    <td></td>
                    <td></td>
                    <th class="text-center mx-auto">
                      <div class="px-2 w-2">|</div>
                    </th>
                    <td></td>

                    <td class="text-right">
                      <!--  {{
                        formatCurrency(corretora.totalCorretora.valorComprado)
                      }} -->
                    </td>

                    <td class="text-right">
                      <!-- {{ formatCurrency(corretora.totalCorretora.performance) }} -->
                    </td>

                    <td class="text-right">
                      <!--  {{ corretora.totalCorretora.variacaoPercentual }}% -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useTicker } from "./composables/useTicker";
const { getCorretorasComOperacoesPerformance } = useTicker();
import { store } from "./composables/storeTicker";
import { storeCalendario } from "../../components/Calendario/storeCalendario";
onBeforeMount(async () => {
  await getCorretorasComOperacoesPerformance(storeCalendario.dataSelecionadaFormatada);
});

watch(
  () => storeCalendario.dataSelecionadaFormatada,
  async (newValue) => {
    if (!newValue) return;
    await getCorretorasComOperacoesPerformance(newValue);
  },
  { immediate: true }
);

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

const formatarNumero = (valor: number | null) => {
  if (valor === null || valor === undefined) return "-";
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


function formatCurrency(value: any) {
  // Implemente sua formatação de moeda aqui
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
</script>
