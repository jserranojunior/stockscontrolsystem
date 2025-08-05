<template>
  <div class="mx-auto p-6 space-y-10" v-if="store.ativos">
    <!-- Loop através de todos os ativos -->
    <div v-for="(corretora, index) in store.ativos" :key="index">
      <div
        v-for="(ticker, index) in corretora.tickers"
        :key="index"
        class="card bg-base-200 shadow-lg rounded-lg p-6 mb-10"
      >
        <!-- Cabeçalho com nome do ativo -->
        <h1 class="text-3xl font-bold mb-6">
          {{ ticker.tick }}
          <span v-if="ticker.name.String" class="text-xl font-normal">
            - {{ ticker.name.String }}
          </span>
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
                <th class="border border-gray-300 p-2">Valor Uni.</th>
                <th class="border border-gray-300 p-2">Compra</th>
                <th class="border border-gray-300 p-2">Venda</th>
                <th class="border border-gray-300 p-2">Carteira</th>
                <th class="border border-gray-300 p-2">PM</th>
                <th class="border border-gray-300 p-2">L/P</th>
                <th class="border border-gray-300 p-2">Div</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(op, index) in ticker.operacoes" :key="index">
                <td class="border border-gray-300 p-2 text-center">
                  {{ op.tipoOperacao }}
                </td>
                <td class="border border-gray-300 p-2 text-center">
                  {{ formatarData(op.data) }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{
                    op.tipoOperacao === "C"
                      ? formatarNumero(op.quantidade)
                      : "-"
                  }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{
                    op.tipoOperacao === "V"
                      ? formatarNumero(op.quantidade)
                      : "-"
                  }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{ formatarNumero(op.saldoTickers) }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{ formatarMoeda(op.valorUnidade) }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{
                    op.tipoOperacao === "C" ? formatarMoeda(op.valorTotal) : "-"
                  }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{
                    op.tipoOperacao === "V" ? formatarMoeda(op.valorTotal) : "-"
                  }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{ formatarMoeda(op.carteira) }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{ formatarMoeda(op.precoMedioCompra) }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{ "-" }}
                </td>
                <td class="border border-gray-300 p-2 text-right">
                  {{ "-" }}
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

              <div v-if="ticker.posicao">
                {{ formatarNumero(ticker.posicao) }}
              </div>

              <template v-else>
                <div>Sem operações</div>
              </template>
            </div>

            <div class="flex justify-between">
              <div class="font-semibold">P. Atual:</div>
              <div v-if="ticker.precoAtual">
                {{ formatarMoeda(ticker.precoAtual) }}
              </div>
            </div>
            <template v-if="ticker.operacoes">
              <div class="flex justify-between">
                <span class="font-semibold">Resultado:</span>

                <!-- Percentual -->
                <div
                  :class="{
                    'text-blue-600': resultadoPercentual(ticker) > 0,
                    'text-red-600': resultadoPercentual(ticker) < 0,
                    'text-gray-600': resultadoPercentual(ticker) === 0,
                  }"
                >
                  {{ resultadoPercentual(ticker).toFixed(2) }}%
                </div>

                <!-- Valor -->
                <div
                  :class="{
                    'text-blue-600': resultadoValor(ticker) > 0,
                    'text-red-600': resultadoValor(ticker) < 0,
                    'text-gray-600': resultadoValor(ticker) === 0,
                  }"
                >
                  {{ formatarMoeda(resultadoValor(ticker)) }}
                </div>
              </div>
            </template>
          </div>
          <!-- META -->
          <div class="bg-base-100 p-4 rounded-lg">
            <div class="flex justify-between">
              <div class="font-semibold">Meta:</div>
              <div>+25%</div>
            </div>

            <div class="flex justify-between">
              <div class="font-semibold">1.25:</div>
              <div v-if="ticker.posicao">
                {{ formatarMoeda(calcularMetaValor(ticker.posicao)) }}
              </div>
            </div>

            <div class="flex justify-between">
              <div class="font-semibold">Dif.:</div>
              <div v-if="ticker.operacoes && ticker.operacoes.length">
                {{
                  formatarMoeda(
                    calcularDiferencaMeta(
                      ticker.posicao,
                      ticker.precoAtual,
                      ticker.operacoes[ticker.operacoes.length - 1].saldoTickers
                    )
                  )
                }}
              </div>
            </div>
          </div>
          <!-- INVESTIDO -->
          <div class="bg-base-100 p-4 rounded-lg">
            <div class="flex justify-between" v-if="ticker.operacoes">
              <div class="font-semibold">Nomad Investido:</div>
              <div>
                {{
                  formatarMoeda(
                    ticker.operacoes[ticker.operacoes.length - 1].carteira
                  )
                }}
              </div>
            </div>

            <div
              class="flex justify-between"
              v-if="ticker.operacoes && ticker.operacoes.length > 0"
            >
              <div class="font-semibold">PMC:</div>
              <div>
                {{
                  formatarMoeda(
                    ticker.operacoes[ticker.operacoes.length - 1]
                      .precoMedioCompra
                  )
                }}
              </div>
            </div>

            <div class="flex justify-between" v-if="ticker.operacoes">
              <div class="font-semibold">Stocks:</div>
              <div>
                {{
                  formatarNumero(
                    ticker.operacoes[ticker.operacoes.length - 1].saldoTickers
                  )
                }}
              </div>
            </div>

            <template v-else>
              <div>Sem operações</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { store } from "./composables/storeTicker";
import { useTicker } from "./composables/useTicker";
const { getCorretorasComOperacoes } = useTicker();

onBeforeMount(async () => {
  await getCorretorasComOperacoes();
});

const calcularMetaValor = (carteira: number): number => {
  return carteira * 1.25;
};

const calcularDiferencaMeta = (
  carteira: number,
  precoAtual: number,
  saldo: number
): number => {
  const posicaoAtual = (precoAtual ?? 0) * (saldo ?? 0);
  const meta = calcularMetaValor(carteira ?? 0);
  const diferenca = posicaoAtual - meta;
  return parseFloat(diferenca.toFixed(2));
};

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

const resultadoValor = (ticker: any): number => {
  if (!ticker.operacoes || ticker.operacoes.length === 0) return 0;

  const ultimaOp = ticker.operacoes[ticker.operacoes.length - 1];

  const saldo = ultimaOp.saldoTickers ?? 0;
  const carteira = ultimaOp.carteira ?? 0;
  const precoAtual = ticker.precoAtual ?? 0;

  const resultado = saldo * precoAtual - carteira;

  return parseFloat(resultado.toFixed(2));
};

const resultadoPercentual = (ticker: any): number => {
  if (!ticker.operacoes || ticker.operacoes.length === 0) return 0;

  const ultimaOp = ticker.operacoes[ticker.operacoes.length - 1];

  const carteira = ultimaOp.carteira ?? 0;
  const posicao = ticker.posicao ?? 0;

  if (carteira === 0) return 0;

  const resultado = posicao - carteira;
  const percentual = (resultado / carteira) * 100;

  return parseFloat(percentual.toFixed(2));
};
</script>
