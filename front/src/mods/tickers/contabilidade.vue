<template>
  <div class="mx-auto p-6 space-y-10">
    <!-- Loop através de todos os ativos -->
    <div
      v-for="(ativo, ticker) in store.ativos"
      :key="ticker"
      class="card bg-base-200 shadow-lg rounded-lg p-6 mb-10"
    >
      <!-- Cabeçalho com nome do ativo -->
      <h1 class="text-3xl font-bold mb-6">
        {{ ticker }}
        <span v-if="ativo.nome" class="text-xl font-normal"
          >- {{ ativo.nome }}</span
        >
      </h1>

      <!-- Tabela de operações -->
      <div class="overflow-x-auto mb-6">
        <table
          class="table table-sm w-full bg-white border border-gray-300 text-sm"
        >
          <thead>
            <tr class="bg-gray-100 font-bold text-gray-800">
              <th class="border border-gray-300 p-2">C/V</th>
              <th class="border border-gray-300 p-2">Data</th>
              <th class="border border-gray-300 p-2">C</th>
              <th class="border border-gray-300 p-2">V</th>
              <th class="border border-gray-300 p-2">Saldo</th>
              <th class="border border-gray-300 p-2">Valor</th>
              <th class="border border-gray-300 p-2">Compra</th>
              <th class="border border-gray-300 p-2">Venda</th>
              <th class="border border-gray-300 p-2">Carteira</th>
              <th class="border border-gray-300 p-2">PM</th>
              <th class="border border-gray-300 p-2">L/P</th>
              <th class="border border-gray-300 p-2">Div</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(op, index) in ativo.operacoes" :key="index">
              <td class="border border-gray-300 p-2 text-center">
                {{ op.cv }}
              </td>
              <td class="border border-gray-300 p-2 text-center">
                {{ formatarData(op.data) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarNumero(op.c) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarNumero(op.v) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarNumero(op.saldo) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarMoeda(op.valor) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarMoeda(op.compra) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarMoeda(op.venda) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarMoeda(op.carteira) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ formatarMoeda(op.pm) }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ op.lp || "-" }}
              </td>
              <td class="border border-gray-300 p-2 text-right">
                {{ op.div || "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Resumo da posição -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div class="bg-base-100 p-4 rounded-lg">
          <div class="flex justify-between">
            <div class="font-semibold">Posição:</div>
            <div>
              {{ formatarMoeda(ativo.performance.posicao) }}
            </div>
          </div>
          <div class="flex justify-between">
            <div class="font-semibold">P. Atual:</div>
            <div>{{ formatarMoeda(ativo.performance.atual) }}</div>
          </div>
          <template v-if="typeof ativo.performance.resultado === 'object'">
            <div class="flex justify-between">
              <span class="font-semibold">Resultado:</span>
              <div class="text-red-500">
                {{ ativo.performance.resultado.percentual }}
              </div>
              <div class="text-red-500">
                {{ formatarMoeda(ativo.performance.resultado.valor) }}
              </div>
            </div>
          </template>
        </div>

        <div class="bg-base-100 p-4 rounded-lg">
          <div>
            <div class="flex justify-between">
              <div class="font-semibold">Meta:</div>
              <div>+25%</div>
            </div>
            <div class="flex justify-between">
              <div class="font-semibold">1.25:</div>
              <div>{{ formatarMoeda(ativo.performance.meta) }}</div>
            </div>
          </div>

          <div class="flex justify-between">
            <div class="font-semibold">Dif.:</div>
            <div>{{ formatarMoeda(ativo.performance.diferenca) }}</div>
          </div>
        </div>

        <div class="bg-base-100 p-4 rounded-lg">
          <div class="flex justify-between">
            <div class="font-semibold">Nomad Investido:</div>
            <div>{{ formatarMoeda(ativo.performance.investido) }}</div>
          </div>

          <div class="flex justify-between">
            <div class="font-semibold">PMC:</div>
            <div>{{ formatarMoeda(ativo.performance.pmc) }}</div>
          </div>
          <div class="flex justify-between">
            <div class="font-semibold">Stocks:</div>
            <div>{{ ativo.performance.stocks }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from "./composables/storeTicker";

const formatarMoeda = (valor: number | null) => {
  if (valor === null || valor === undefined) return "-";
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatarNumero = (valor: number | null) => {
  if (valor === null || valor === undefined) return "-";
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatarData = (dataString: string) => {
  if (!dataString) return "-";
  const [ano, mes, dia] = dataString.split("-");
  return `${dia}/${mes}/${ano}`;
};
</script>
