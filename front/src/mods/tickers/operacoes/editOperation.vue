<template>
  <div class="p-2 space-y-10 mx-6">
    <div class="card bg-base-200 rounded-2xl p-4">
      <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">

        Editar Operação
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
                <input type="date" v-model="store.editarOperacao.data" class="input input-bordered w-full pl-10"
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
                  v-model="store.editarOperacao.tickerId">
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
              <select v-model="store.editarOperacao.tipoOperacao" class="select select-bordered w-full">
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
                <input type="number" v-model="store.editarOperacao.quantidade" class="input input-bordered w-full"
                  min="1" placeholder="Nº de ações" />

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

          <div class="w-full md:w-1/2 lg:w-1/4">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Carteira depois da compra</span>
              </label>
              <div class="relative">

                <input type="text" v-model="state.carteira" v-money="moneyMask"
                  class="input input-bordered w-full pl-10" placeholder="0,00" />
              </div>

            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/4 mt-2">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Saldo depois da compra</span>
              </label>
              <div class="relative">

                <input type="text" v-model="store.editarOperacao.saldoTickers" class="input input-bordered w-full pl-10"
                  placeholder="0" />
              </div>

            </div>
          </div>

        </div>




        <!-- Botão Submit -->

        <div class="flex float-right">
          <div class="pt-2 float-right mx-2">
            <button class="btn btn-warning w-full md:w-auto gap-2" @click="router.push({ name: 'contabilidade' })">

              Voltar
            </button>
          </div>

          <div class="pt-2 float-right">
            <button class="btn btn-success w-full md:w-auto gap-2" @click="updateOperacoes()">

              Atualizar Operação
            </button>
          </div>
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
import { useRouter } from "vue-router";
const router = useRouter();
const { atualizarOperacao, getCorretoras, getTickersCorretoraID, calcularUnidade, getOperacoesID } = useTicker();

let state = reactive({
  valorTotal: "",
  precoMedioCompra: "",
  carteira: ""
});



async function updateOperacoes() {

  await atualizarOperacao(store.editarOperacao).then(() => {
    // Limpar formulário após adicionar a operação
    store.editarOperacao = {
      ID: 0,
      data: "",
      tipoOperacao: "C",
      quantidade: 0,
      valorUnidade: 0,
      valorTotal: 0,
      precoMedioCompra: 0,
      saldoTickers: 0,
      carteira: 0,
      tickerId: 0,
      ticker: null
    };
    state.valorTotal = "";
    state.precoMedioCompra = "";

    store.corretoraSelecionada = null;
    store.corretoraTickers = [];


    router.push({ name: "contabilidade", params: {} });

  });
}






onBeforeMount(async () => {
  await getCorretoras().then(async () => {
    await getOperacoesID(store.editarOperacao.ID).then((res: any) => {

      store.editarOperacao.data = store.editarOperacao.data.split('T')[0];
      state.valorTotal = String(store.editarOperacao.valorTotal)
      state.precoMedioCompra = String(store.editarOperacao.precoMedioCompra)

      state.carteira = String(store.editarOperacao.carteira)
      store.editarOperacao.valorUnidade = calcularUnidade(store.editarOperacao.valorTotal, store.editarOperacao.quantidade);


      if (store.editarOperacao.ticker.corretora) {
        store.corretoraSelecionada = store.editarOperacao.ticker.corretora
        store.editarOperacao.tickerId = store.editarOperacao.ticker.ID
      }


    })
  })
});


/* watch(() => store.editarOperacao.tipoOperacao, () => {
  calcularOperacao();
});
 */
watch(
  () => store.corretoraSelecionada,
  (newValue) => {
    getTickersCorretoraID(newValue);

  }
);

watch(
  () => store.editarOperacao.valorTotal,
  (newValue) => {
    store.editarOperacao.valorUnidade = calcularUnidade(store.editarOperacao.valorTotal, store.editarOperacao.quantidade);
  }
);




/* watch(() => store.editarOperacao.valorTotal, (newValue) => {
  calcularOperacao();
}); */

/* watch(
  () => store.editarOperacao.tickerId,
  (newValue) => {
    calcularOperacao();
  }
); */

watch(
  () => store.editarOperacao.quantidade,
  (newValue) => {
    store.editarOperacao.valorUnidade = calcularUnidade(store.editarOperacao.valorTotal, store.editarOperacao.quantidade);
  }
);

/* watch(() => store.editarOperacao.quantidade, (newValue) => {
  calcularOperacao();
}); */

watch(() => state.valorTotal, (newValue) => {
  store.editarOperacao.valorTotal = moneyToFloat(newValue);
});
watch(() => state.carteira, (newValue) => {
  store.editarOperacao.carteira = moneyToFloat(newValue);
});



watch(() => state.precoMedioCompra, (newValue) => {
  store.editarOperacao.precoMedioCompra = moneyToFloat(newValue);
});

</script>
