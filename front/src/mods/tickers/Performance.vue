<template>
  <div>


    <Modal :nome="'atualizartick'" v-if="store.ativoSelecionado">
      <template #header>
        <h3 class="text-lg font-bold">Atualizar Valor Atual</h3>
        <p class="py-4">{{ store.ativoSelecionado.tick }}</p>
      </template>
      <template #body>
        <input type="text" placeholder="0,00" class="input input-bordered w-full"
          v-model="store.ativoSelecionado.valorSemFormatar" v-money="moneyMask" />

      </template>
      <template #footer>
        <button class="btn btn-success mt-4 float-right mx-1" @click="atualizarValorTick()">Atualizar</button>

        <button class="btn btn-warning mt-4 float-right mx-1"
          @click="togleShowModalFixed({ nome: 'atualizartick', show: false })">Fechar</button>
      </template>
    </Modal>


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
            <tbody>

              <tr class="bg-gray-100 font-semibold" v-for="corretora in store.ativos" :key="corretora.ID">
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
                    <tr class="bg-gray-100 font-semibold"
                      v-if="corretora && corretora.totalPerformanceDiaria && corretora.totalPerformanceDiaria.carteira">
                      <td title="Movimentação diaria">Total Diário</td>


                      <td class="text-right">
                        {{ formatarNumero(corretora.totalPerformanceDiaria.carteira) }}
                      </td>

                      <td class="text-right"> {{ corretora.totalPerformanceDiaria.saldo }}
                      </td>
                      <td>{{ formatarNumero(corretora.totalPerformanceDiaria.precoMedio) }}</td>
                      <th class="text-center mx-auto">
                        <div class="px-2 w-2">|</div>
                      </th>
                      <td>{{ formatarNumero(corretora.totalPerformanceDiaria.precoAtual) }}</td>

                      <td class="text-right"> {{ formatarNumero(corretora.totalPerformanceDiaria.posicao) }}
                      </td>

                      <td class="text-right"> {{ formatarNumero(corretora.totalPerformanceDiaria.performance) }}

                      </td>

                      <td class="text-right">

                        {{ formatarNumero(corretora.totalPerformanceDiaria.variacaoPercentual) }}
                      </td>
                      <td></td>
                    </tr>

                    <!-- Total Corretora -->
                    <tr class="bg-gray-200 font-bold text-sm">
                      <td title="Total Dia Anterior - Final do dia">
                        Total {{ corretora.nome.split(" ")[0] }}
                      </td>
                      <td class="text-right text-lg text-green-700"
                        v-if="corretora.totalPerformanceDiaria && corretora.totalPerformanceDiaria.posicao">
                        {{ formatarNumero(corretora.totalPerformanceDiaria.posicao) }}
                      </td>
                      <td>
                      </td>



                      <td>
                      </td>
                      <td>

                      </td>

                      <td>

                      </td>


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
                      <td></td>
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
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import Modal from "../../components/modals/Modal.vue";
import { useModal } from "../../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();
import { useTicker } from "./composables/useTicker";
const { getCorretorasComOperacoesPerformance, atualizarTicker } = useTicker();
import { store } from "./composables/storeTicker"
import { moneyMask, formatarMoeda } from "../../helpers/mask/moneyMask";
import moneyToFloat from "../../helpers/filters/moneyToFloat";
onBeforeMount(async () => {
  await getCorretorasComOperacoesPerformance();
});

async function abrirModalEditarTick(ativoSelecionado: any) {
  store.ativoSelecionado = ativoSelecionado;
  togleShowModalFixed({ nome: "atualizartick", show: true });
}

function dataHoraAtual() {
  const data = new Date(); // pega a hora local (GMT-3 se navegador estiver correto)

  // formata YYYY-MM-DDTHH:mm:ss
  const pad = (n: number) => n.toString().padStart(2, "0");

  const ano = data.getFullYear();
  const mes = pad(data.getMonth() + 1);
  const dia = pad(data.getDate());
  const hora = pad(data.getHours());
  const min = pad(data.getMinutes());
  const seg = pad(data.getSeconds());

  return `${ano}-${mes}-${dia}T${hora}:${min}:${seg}`; // sem Z
}

async function atualizarValorTick() {



  if (store.ativoSelecionado) {
    store.ativoSelecionado.dataAtualizacaoPrecoAtual = dataHoraAtual()
    store.ativoSelecionado.precoAtual = moneyToFloat(store.ativoSelecionado.valorSemFormatar)
  }
  await atualizarTicker(store.ativoSelecionado).then(async () => {
    store.ativoSelecionado.precoAtual = String(store.ativoSelecionado.precoAtual)

    await getCorretorasComOperacoesPerformance().then(() => {
      togleShowModalFixed({ nome: "atualizartick", show: false });

    })

  }
  )


  /*  unh 265,86 */
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


function formatCurrency(value: any) {
  // Implemente sua formatação de moeda aqui
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}




</script>
