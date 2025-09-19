<template>
  <div>

    <UpdateValorTick></UpdateValorTick>

    <div class="p-6 flex justify-center items-center">
      <div class="w-full">
        <h1 class="text-3xl font-bold my-4 text-center">
          Resumo de Performance
        </h1>
      </div>
    </div>

    <div class="flex flex-wrap justify-center p-1">
      <div class="w-full max-w-6xl mx-auto">
        <div class="flex flex-wrap justify-center">
          <table class="table  w-full min-w-[800px] text-md bg-base-100">
            <thead class="text-black">
              <tr>
                <td colspan="4" class="text-center bg-yellow-100">
                  INVESTIDO
                </td>
                <td class="text-center mx-auto">
                  <div class="px-2 w-2">|</div>
                </td>
                <td colspan="5" class="text-center bg-blue-200">
                  PERFORMANCE
                </td>
              </tr>
              <tr class="text-xs uppercase tracking-wide bg-gray-100">


                <th class="text-center" title="Nome do ativo">CORRRETORA</th>


                <th class="text-right" title="Valor investido">
                  Investido
                </th>

                <th class="text-right" title="Quantidade de ativos em carteira">
                  STOCKS
                </th>
                <th class="text-right" title="Preço Médio (Valor Médio)">
                  PM
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
            <tbody v-if="store.ativos">

              <tr class="bg-gray-100 font-semibold"
                v-for="corretora in (Array.isArray(store.ativos) ? store.ativos.filter(c => c.totalPerformanceDiaria) : [])"
                :key="corretora.ID">

                <td title="Movimentação diaria">{{ corretora.nome }}</td>



                <td class="text-right">
                  {{ formatarNumero(corretora.totalPerformanceDiaria.carteira) }}
                </td>

                <td class="text-right"> {{ corretora.totalPerformanceDiaria.saldo }}
                </td>
                <td class="text-right">{{ formatarNumero(corretora.totalPerformanceDiaria.precoMedio) }}</td>
                <th class="text-center mx-auto">
                  <div class="px-2 w-2">|</div>
                </th>
                <td class="text-right">{{ formatarNumero(corretora.totalPerformanceDiaria.precoAtual) }}</td>

                <td class="text-right"> {{ formatarNumero(corretora.totalPerformanceDiaria.posicao) }}
                </td>

                <td class="text-right"> {{ formatarNumero(corretora.totalPerformanceDiaria.performance) }}

                </td>

                <td class="text-right">

                  {{ formatarNumero(corretora.totalPerformanceDiaria.variacaoPercentual) }}
                </td>


              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


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
                <table class="table  w-full min-w-[800px] text-md bg-base-100">
                  <thead class="text-black">
                    <tr>
                      <td colspan="4" class="text-center bg-yellow-100">
                        INVESTIDO
                      </td>
                      <td class="text-center mx-auto">
                        <div class="px-2 w-2">|</div>
                      </td>
                      <td colspan="5" class="text-center bg-blue-200">
                        PERFORMANCE
                      </td>
                    </tr>
                    <tr class="text-xs uppercase tracking-wide bg-gray-100">


                      <th class="text-center" title="Nome do ativo">ATIVOS</th>


                      <th class="text-right" title="Valor investido">
                        Investido
                      </th>

                      <th class="text-right" title="Quantidade de ativos em carteira">
                        ATIVOS
                      </th>
                      <th class="text-right" title="Preço Médio (Valor Médio)">
                        PM
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
                      <th class="text-right" title="Data da atualização do preço atual">
                        Atualizado
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

                    <tr v-for="operacoes in corretora.operacoes" :key="operacoes.codigo"
                      @click="abrirModalEditarTick(operacoes)" class="hover:bg-gray-300 transition cursor-pointer">


                      <td class="text-center font-bold">{{ operacoes.tick }}</td>

                      <td class="text-right font-medium">
                        {{ formatarNumero(operacoes.carteira) }}
                      </td>

                      <td class="text-right font-medium">
                        {{ operacoes.saldo }}
                      </td>
                      <td class="text-right">
                        {{ formatarNumero(operacoes.precoMedio) }}
                      </td>
                      <th class="text-center mx-auto">
                        <div class="px-2 w-2">|</div>
                      </th>
                      <td class="text-left">
                        {{ formatarMoeda(operacoes.precoAtual) }}
                      </td>
                      <td class="text-right">
                        {{ formatarNumero(operacoes.posicao) }}
                      </td>

                      <td class="text-right font-bold" :class="{
                        'text-green-600': operacoes.performance > 0,
                        'text-red-600': operacoes.performance < 0
                      }">
                        {{ formatarNumero(operacoes.performance) }}
                      </td>

                      <td class="text-right font-bold" :class="{
                        'text-green-600': operacoes.variacaoPercentual > 0,
                        'text-red-600': operacoes.variacaoPercentual < 0
                      }">
                        {{ operacoes.variacaoPercentual }}%
                      </td>



                      <td> {{ formatarData(operacoes.dataAtualizacaoPrecoAtual) }}
                      </td>
                    </tr>

                    <!-- Total Diário -->
                    <tr class="bg-gray-100 font-semibold text-base text-center"
                      v-if="corretora && corretora.totalPerformanceDiaria && corretora.totalPerformanceDiaria.carteira">
                      <td title="Movimentação diaria"> Total <!-- {{ corretora.nome.split(" ")[0] }} --></td>


                      <td class="text-right text-blue-600">
                        {{ formatarNumero(corretora.totalPerformanceDiaria.carteira) }}
                      </td>

                      <td class="text-right">
                      </td>
                      <td></td>
                      <th class="text-center mx-auto">
                        <div class="px-2 w-2">|</div>
                      </th>
                      <td></td>

                      <td class="text-right text-green-700"> {{
                        formatarNumero(corretora.totalPerformanceDiaria.posicao)
                        }}
                      </td>

                      <td class="text-right"> {{ formatarNumero(corretora.totalPerformanceDiaria.performance) }}

                      </td>

                      <td class="text-right ">

                        {{ formatarNumero(corretora.totalPerformanceDiaria.variacaoPercentual) }}%
                      </td>
                      <td></td>
                    </tr>
                    <tr class=" font-semibold text-base text-center">
                      <td colspan="5"></td>
                      <td colspan="1" class="text-left">Disponível</td>
                      <td colspan="1" class="text-right text-blue-600 cursor-pointer"
                        @click="selecionarCorretora(corretora.ID, corretora.disponivel)">{{
                          formatarNumero(corretora.disponivel) }}</td>

                    </tr>


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <UpdateCaixa></UpdateCaixa>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref, watch } from "vue";
import { useModal } from "../../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();
import { useTicker } from "./composables/useTicker";
const { getCorretorasComOperacoesPerformance } = useTicker();
import { store } from "./composables/storeTicker"
import { formatarMoeda } from "../../helpers/mask/moneyMask";
import UpdateCaixa from "./UpdateCaixa.vue";
import UpdateValorTick from "./UpdateValorTick.vue";

onBeforeMount(async () => {
  await getCorretorasComOperacoesPerformance();

});

function selecionarCorretora(corretoraID: number, valor: number) {

  store.corretoraSelecionada = {
    ID: corretoraID,
    disponivel: formatarMoeda(valor),
  }
  togleShowModalFixed({ nome: "atualizarcaixa", show: true });
}


async function abrirModalEditarTick(ativoSelecionado: any) {
  store.ativoSelecionado = ativoSelecionado;
  togleShowModalFixed({ nome: "atualizartick", show: true });
}


function formatarData(valor: any) {
  if (!valor) return "";

  const data = new Date(valor);

  // Checa explicitamente se o ano é 1 (zero value do Go)
  if (data.getFullYear() <= 1) {
    return ""; // ou "Sem data"
  }

  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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






</script>
