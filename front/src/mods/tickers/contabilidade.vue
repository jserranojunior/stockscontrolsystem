<template>
  <div class="mx-auto p-6 space-y-10">
    <div class="flex justify-center">
      <div class="w-1/3 card bg-base-200 shadow-lg rounded-lg p-6">
        <div>
          <label for="corretora" class="label">
            <span class="label-text font-medium">Selecione a Corretora</span>
          </label>

          <select
            name="corretora"
            id="corretora"
            class="cursor-pointer select select-bordered w-full"
          >
            <option value="corretora1">Corretora 1</option>
            <option value="corretora2">Corretora 2</option>
            <option value="corretora3">Corretora 3</option>
          </select>
        </div>
        <div>
          <label for="ano" class="label">
            <span class="label-text font-medium">Ano</span>
          </label>
          <select id="ano" class="select select-bordered w-full">
            <option value="">Selecione um ano</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <!-- Adicione mais anos conforme necessário -->
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="mx-auto p-6 space-y-10">
    <h1 class="text-3xl font-bold text-center">Contabilidade</h1>

    <!-- Formulário para adicionar operações -->

    <!-- Tabela de operações -->
    <div class="card bg-base-200 shadow-lg rounded-lg p-6 overflow-x-auto">
      <table
        class="table bg-base-100 table-sm w-full text-sm border border-gray-700"
      >
        <thead>
          <tr
            class="bg-base-200 text-center border-b border-gray-700 text-black"
          >
            <th>Data</th>
            <th>Tick</th>
            <th># Compra</th>
            <th># Venda</th>
            <th># Saldo</th>
            <th>$ Valor Compra</th>
            <th>$ Valor Venda</th>
            <th>$ Valor Carteira Comprada</th>
            <th>$ Preço médio do ativo</th>
            <th>$ Resultado de negociação</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in relatorioCalculado"
            :key="index"
            class="text-center text-black border-t border-gray-700"
          >
            <td>{{ formatarData(item.data) }}</td>
            <td class="font-semibold">{{ item.tick }}</td>
            <td>{{ item.qtdCompra ?? "-" }}</td>
            <td :class="item.qtdVenda ? 'text-red-600 font-semibold' : ''">
              {{ item.qtdVenda ?? "-" }}
            </td>
            <td>{{ item.saldo }}</td>
            <td>{{ formatarMoeda(item.valorCompra) }}</td>
            <td>{{ formatarMoeda(item.valorVenda) }}</td>
            <td>{{ formatarMoeda(item.valorCarteiraComprada) }}</td>
            <td>{{ formatarMoeda(item.precoMedioAtivo) }}</td>
            <td
              :class="{
                'text-green-600 font-semibold': item.resultadoNegociacao > 0,
                'text-red-600 font-semibold': item.resultadoNegociacao < 0,
              }"
            >
              {{ formatarMoeda(item.resultadoNegociacao) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from "./composables/storeTicker";
import { useTicker } from "./composables/useTicker";

const { formatarMoeda, formatarData, relatorioCalculado } = useTicker();
</script>
