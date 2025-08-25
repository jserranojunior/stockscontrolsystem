<template>
  <div class="p-2 space-y-10 mx-6">
    <div class="card bg-base-200 rounded-2xl p-4">
      <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nova Operação
      </h2>



      <div class="space-y-4">
        <div class="flex flex-wrap justify-between">
          <!-- Data -->
          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Data da Operação</span>
              </label>
              <div class="relative">
                <input type="date" v-model="store.novaOperacao.data" class="input input-bordered w-full pl-10"
                  required />
                <span class="absolute left-3 top-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Corretora</span>
              </label>
              <div class="relative">
                <select name="corretora" id="corretora" class="cursor-pointer select select-bordered w-full"
                  v-model="store.corretoraSelecionada">
                  <option v-for="corretora in store.corretoras" :key="corretora.ID" :value="corretora.ID">
                    {{ corretora.nome }}
                  </option>
                </select>
              </div>
            </div>

          </div>
          <!-- Ativo -->
          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Tick</span>
              </label>
              <div class="relative">
                <select name="corretora" id="corretora" class="cursor-pointer select select-bordered w-full"
                  v-model="store.novaOperacao.tickerId">
                  <option v-for="ticker in store.corretoraTickers" :key="ticker.ID" :value="ticker.ID">
                    {{ ticker.tick }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Tipo de Operação</span>
              </label>
              <select v-model="store.novaOperacao.tipoOperacao" class="select select-bordered w-full">
                <option value="C" class="text-success">Compra</option>
                <option value="V" class="text-error">Venda</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Campos dinâmicos -->
        <div class="flex flex-wrap">

          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Quantidade</span>
              </label>
              <div class="relative">
                <input type="number" v-model="store.novaOperacao.quantidade" class="input input-bordered w-full" min="1"
                  placeholder="Nº de ações" />

              </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Valor Total</span>
              </label>
              <div class="relative">

                <input type="text" v-model="state.valorTotal" v-money="moneyMask"
                  class="input input-bordered w-full pl-10" placeholder="0,00" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Preço Médio de Compra</span>
              </label>
              <div class="relative">

                <input type="text" v-model="state.precoMedioCompra" v-money="moneyMask"
                  class="input input-bordered w-full pl-10" placeholder="0,00" />
              </div>

            </div>
          </div>

        </div>




        <!-- Botão Submit -->
        <div class="pt-2 float-right">
          <button class="btn btn-primary w-full md:w-auto gap-2" @click="addOperacao()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Registrar Operação
          </button>
        </div>
      </div>
    </div>


  </div>


</template>

<script setup lang="ts">
import { onBeforeMount, reactive, watch } from "vue";
import { store } from "../composables/storeTicker";
import { useTicker } from "../composables/useTicker";
import { moneyMask } from "../../../helpers/mask/moneyMask";
import moneyToFloat from "../../../helpers/filters/moneyToFloat";
const { adicionarOperacao, getCorretoras, getTickersCorretoraID, calcularSaldo, calcularCarteira, calcularUnidade } = useTicker();

let state = reactive({
  valorTotal: "",
  precoMedioCompra: "",

});

function addOperacao() {
  adicionarOperacao();
}


function getOperacoes() {
  store.novaOperacao.valorTotal = moneyToFloat(state.valorTotal);
  store.novaOperacao.precoMedioCompra = moneyToFloat(state.precoMedioCompra);

  store.corretoraTickers.find((ticker: any) => {

    if (ticker.ID === store.novaOperacao.tickerId) {
      console.log(ticker)
      if (ticker.operacoes && ticker.operacoes[0]) {
        store.novaOperacao.saldoTickers = calcularSaldo(ticker.operacoes[0].saldoTickers, store.novaOperacao.tipoOperacao, store.novaOperacao.quantidade);
        store.novaOperacao.carteira = calcularCarteira(ticker.operacoes[0].carteira, store.novaOperacao.tipoOperacao, store.novaOperacao.valorTotal);
      } else {
        store.novaOperacao.saldoTickers = calcularSaldo(0, 'C', 0);
        store.novaOperacao.carteira = calcularCarteira(0, 'C', 0);
      }

      return true;
    }
    return false;
  });
}


onBeforeMount(async () => {
  await getCorretoras()
});


watch(() => store.novaOperacao.tipoOperacao, () => {
  getOperacoes();
});

watch(
  () => store.corretoraSelecionada,
  (newValue) => {
    getTickersCorretoraID(newValue);

  }
);

watch(
  () => store.novaOperacao.valorTotal,
  (newValue) => {
    store.novaOperacao.valorUnidade = calcularUnidade(store.novaOperacao.valorTotal, store.novaOperacao.quantidade);
  }
);

watch(() => store.novaOperacao.valorTotal, (newValue) => {
  getOperacoes();
});

watch(
  () => store.novaOperacao.tickerId,
  (newValue) => {
    getOperacoes();

  }
);

watch(
  () => store.novaOperacao.quantidade,
  (newValue) => {
    store.novaOperacao.valorUnidade = calcularUnidade(store.novaOperacao.valorTotal, store.novaOperacao.quantidade);
  }
);

watch(() => store.novaOperacao.quantidade, (newValue) => {
  getOperacoes();
});

watch(() => state.valorTotal, (newValue) => {
  store.novaOperacao.valorTotal = moneyToFloat(newValue);
});
watch(() => state.precoMedioCompra, (newValue) => {
  store.novaOperacao.precoMedioCompra = moneyToFloat(newValue);
});

</script>
