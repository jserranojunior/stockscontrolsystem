<template>

  <Dialog :nome="'addNovaOperacao'" class="z-99" :width="'500px'">
    <template #header>
      <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nova Operação
      </h2>

    </template>

    <template #body>
      <div class="p-2 space-y-10 ">
        <div class="card bg-base-200 rounded-2xl p-4">



          <div class="space-y-4 text-black">
            <div class="flex flex-wrap justify-between">
              <!-- Data -->
              <div class="w-full">
                <div class="form-control mx-2">
                  <label class="label">
                    <span class="label-text font-medium">Data da Operação</span>
                  </label>
                  <div class="relative">
                    <input type="date" v-model="store.novaOperacao.data" class="input input-bordered w-full" required />

                  </div>
                </div>
              </div>

              <div class="w-full">
                <div class="form-control m-2">
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
              <div class="w-full">
                <div class="form-control m-2 ">
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
              <div class="w-full">
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



            <div class="w-full">
              <div class="form-control mx-2">
                <label class="label">
                  <span class="label-text font-medium">Quantidade</span>
                </label>
                <div class="relative">
                  <input type="number" v-model="store.novaOperacao.quantidade" class="input input-bordered w-full"
                    min="1" placeholder="Nº de ações" />

                </div>
              </div>
            </div>

            <div class="w-full">
              <div class="form-control mx-2">
                <label class="label">
                  <span class="label-text font-medium">Valor Total</span>
                </label>
                <div class="relative">

                  <input type="text" v-model="state.valorTotal"
                    @blur="state.valorTotal = formatCurrencyExcel(state.valorTotal)" class="input input-bordered w-full"
                    placeholder="0,00" />
                </div>
              </div>
            </div>

            <div class="w-full">
              <div class="form-control mx-2">
                <label class="label">
                  <span class="label-text font-medium">Preço Médio</span>
                </label>
                <div class="relative">

                  <input type="text" v-model="state.precoMedioCompra"
                    @blur="state.precoMedioCompra = formatCurrencyExcel(state.precoMedioCompra)"
                    class="input input-bordered w-full" placeholder="0,00" />
                </div>

              </div>
            </div>

            <div class="w-full">
              <div class="form-control mx-2">
                <label class="label">
                  <span class="label-text font-medium">Carteira depois da operação</span>
                </label>
                <div class="relative">
                  <input type="text" v-model="state.carteira"
                    @blur="state.carteira = formatCurrencyExcel(state.carteira)" class="input input-bordered w-full"
                    placeholder="0,00" />
                </div>
              </div>
            </div>



            <div class="w-full">
              <div class="form-control mx-2">
                <label class="label">
                  <span class="label-text font-medium">Resultado</span>
                </label>
                <div class="relative">
                  <input type="text" v-model="state.resultado"
                    @blur="state.resultado = formatCurrencyExcel(state.resultado)" class="input input-bordered w-full"
                    placeholder="0,00" />
                </div>
              </div>
            </div>
            <div class="w-full">
              <div class="form-control mx-2">
                <label class="label">
                  <span class="label-text font-medium">L/P</span>
                </label>
                <div class="relative">
                  <input type="text" v-model="state.lp" @blur="state.lp = formatCurrencyExcel(state.lp)"
                    class="input input-bordered w-full" placeholder="0,00" />
                </div>
              </div>
            </div>
          </div>






        </div>

      </div>

    </template>
    <template #footer>

      <div class="flex justify-end gap-4 p-4">
        <div class="w-full text-right ">
          <button class="btn btn-primary w-full md:w-auto gap-2" @click="addOperacao()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Registrar Operação
          </button>

          <div class="float-right mx-2">
            <button class="btn btn-warning w-full md:w-auto gap-2" @click="closeModalNovaOperacao()">
              Voltar
            </button>
          </div>
        </div>

      </div>


    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onBeforeUnmount, reactive, ref, watch } from "vue";
import { store } from "../composables/storeTicker";
import { useTicker } from "../composables/useTicker";
import { formatCurrencyExcel } from "../../../helpers/mask/moneyMask";
import moneyToFloat from "../../../helpers/filters/moneyToFloat";
const { adicionarOperacao, getCorretorasComOperacoes, getCorretoras, getTickersCorretora, calcularSaldo, calcularCarteira, calcularUnidade } = useTicker();
import Dialog from "../../../components/modals/Dialog.vue";

import { useModal } from "../../../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();

let state = reactive({
  valorTotal: "",
  precoMedioCompra: "",
  carteira: "",
  resultado: '',
  lp: "",

});


function closeModalNovaOperacao() {
  togleShowModalFixed({
    nome: "addNovaOperacao",
    show: false,
  });
};


async function addOperacao() {
  console.log(store.novaOperacao)
  adicionarOperacao().then(async (res: any) => {
    if (res) {
      await getCorretorasComOperacoes().then(() => {
        closeModalNovaOperacao();
      }).catch((err) => {
        console.log("Erro ao atualizar corretoras", err);
      });

    } else { console.log("Erro ao adicionar operação", res) }
  });


}


function getOperacoes() {
  store.novaOperacao.valorTotal = moneyToFloat(state.valorTotal);
  store.novaOperacao.precoMedioCompra = moneyToFloat(state.precoMedioCompra);

  store.corretoraTickers.find((ticker: any) => {

    if (ticker.ID === store.novaOperacao.tickerId) {

      if (ticker.operacoes && ticker.operacoes[ticker.operacoes.length - 1]) {


        store.novaOperacao.saldoTickers = calcularSaldo(ticker.operacoes[ticker.operacoes.length - 1].saldoTickers, store.novaOperacao.tipoOperacao, store.novaOperacao.quantidade);

        store.novaOperacao.carteira = calcularCarteira(store.novaOperacao.saldoTickers, ticker.operacoes[ticker.operacoes.length - 1].carteira, store.novaOperacao.tipoOperacao, store.novaOperacao.valorTotal);
      } else {
        store.novaOperacao.saldoTickers = calcularSaldo(0, 'C', store.novaOperacao.quantidade);
        store.novaOperacao.carteira = calcularCarteira(0, 0, 'C', store.novaOperacao.valorTotal);
      }

      console.log(store.novaOperacao.carteira)
      state.carteira = String(store.novaOperacao.carteira);


      return true;
    }
    return false;
  });
}

function handleKeydown(e: any) {
  if (e.key === "Enter") {
    e.preventDefault() // opcional: evita submit automático de forms

    state.valorTotal = formatCurrencyExcel(state.valorTotal)
    state.precoMedioCompra = formatCurrencyExcel(state.precoMedioCompra)
    state.carteira = formatCurrencyExcel(state.carteira)
    state.resultado = formatCurrencyExcel(state.resultado)
    state.lp = formatCurrencyExcel(state.lp)

    console.log(state.lp)
    addOperacao()
  }
}


onBeforeMount(async () => {
  await getCorretoras()
  window.addEventListener("keydown", handleKeydown)
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
})


watch(() => store.novaOperacao.tipoOperacao, () => {
  getOperacoes();
});

watch(
  () => store.corretoraSelecionada,
  (newValue) => {
    if (newValue) {
      getTickersCorretora(newValue);
    }
  }
);

watch(
  () => state.carteira,
  (newValue) => {
    store.novaOperacao.carteira = moneyToFloat(newValue);
  }
);

watch(
  () => state.resultado,
  (newValue) => {
    store.novaOperacao.resultado = moneyToFloat(newValue);

  }
);

watch(
  () => state.lp,
  (newValue) => {
    store.novaOperacao.lp = moneyToFloat(newValue);
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
    if (newValue == 0) {
      store.novaOperacao.carteira = 0
    }
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
