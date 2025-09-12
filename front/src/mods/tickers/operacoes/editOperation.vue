<template>
  <ModalConfirmacao :nomeModalConfirmacao="'confirmarDeleteOperacao'" :functionConfirmarModal="deletarOperacao"
    :functionCancelarModal="voltar">
    <template #header>
      <span>Confirmar</span>
    </template>
    <template #body>
      <span>Confirmar a exclusão da operação?</span>
    </template>
  </ModalConfirmacao>

  <Dialog :nome="'editOperacao'" class="z-99" :width="state.dialog.width">
    <template #header>
      <div class="flex justify-between mt-2">
        <div>
          <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
            Editar Operação
          </h2>
        </div>

        <div @click="toggleCalculadora()" class="flec btn btn-sm">Calculadora <Icon icon="arcticons:opencalc" width="25"
            height="25"></Icon>
        </div>
      </div>
    </template>
    <template #body>
      <div class="flex justify-between mb-2 " v-if="store.editarOperacao.ID">
        <div :class="[
          'card bg-gra-100 rounded-2xl p-2',
          state.dialog.calculadora ? 'w-1/2' : 'w-full'
        ]">
          <!-- Data -->
          <div class="w-full mt-2">
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
          <div class="w-full mt-2">
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
          <div class="w-full mt-2">
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
          <div class="w-full mt-2">
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

          <div class="w-full mt-2">
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

          <div class="w-full mt-2 text-left">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Valor Total</span>
              </label>

              <div class="relative">
                <input type="text" v-model="state.valorTotal" v-money="moneyMask" class="input input-bordered w-full"
                  placeholder="0,00" />

              </div>
            </div>
          </div>

          <div class="w-full mt-2">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Preço Médio</span>
              </label>
              <div class="relative">
                <input type="text" v-model="state.precoMedioCompra" v-money="moneyMask"
                  class="input input-bordered w-full " placeholder="0,00" />
              </div>
            </div>
          </div>

          <div class="w-full mt-2">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Carteira depois da operação</span>
              </label>
              <div class="relative">
                <input type="text" v-model="state.carteira" v-money="moneyMask" class="input input-bordered w-full "
                  placeholder="0,00" />
              </div>
            </div>
          </div>

          <div class="w-full mt-2">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Saldo depois da compra</span>
              </label>
              <div class="relative">
                <input type="text" v-model="store.editarOperacao.saldoTickers" class="input input-bordered w-full "
                  placeholder="0" />
              </div>
            </div>
          </div>



          <div class="w-full mt-2">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">Resultado</span>
              </label>
              <div class="relative">
                <input type="text" v-model="state.resultado" v-money="moneyMask" class="input input-bordered w-full"
                  placeholder="0,00" />
              </div>
            </div>
          </div>
          <div class="w-full mt-2">
            <div class="form-control mx-2">
              <label class="label">
                <span class="label-text font-medium">L/P</span>
              </label>
              <div class="relative">
                <input type="text" v-model="state.lp" v-money="moneyMask" class="input input-bordered w-full"
                  placeholder="0,00" />
              </div>
            </div>
          </div>

        </div>
        <div class="w-1/2" v-if="state.dialog.calculadora">
          <Calculadora></Calculadora>
        </div>
      </div>



    </template>
    <template #footer>
      <div class="flex justify-end">
        <div class="pt-2 float-right mx-2">
          <button class="btn btn-warning w-full md:w-auto gap-2" @click="voltar()">
            Voltar
          </button>
        </div>

        <div class="pt-2 float-right mx-2">
          <button class="btn btn-error w-full md:w-auto gap-2" @click="openConfirmar()">
            Deletar
          </button>
        </div>

        <div class="pt-2 float-right">
          <button class="btn btn-success w-full md:w-auto gap-2" @click="updateOperacoes()">
            Atualizar Operação
          </button>
        </div>
      </div>
    </template>
  </Dialog>




</template>



<script setup lang="ts">
import Dialog from "../../../components/modals/Dialog.vue";
import { onBeforeMount, reactive, ref, watch } from "vue";
import { store } from "../composables/storeTicker";
import { useTicker } from "../composables/useTicker";
import { moneyMask, formatarMoeda } from "../../../helpers/mask/moneyMask";
import moneyToFloat from "../../../helpers/filters/moneyToFloat";

import ModalConfirmacao from "../../../components/modals/ModalConfirmacao.vue";

import { useModal } from "../../../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();


import { useRouter } from "vue-router";
import Calculadora from "../../../components/calculadora/Calculadora.vue";
const router = useRouter();
const {
  atualizarOperacao,
  getCorretoras,
  getTickersCorretoraID,
  calcularUnidade,
  getOperacoesID,
  getCorretorasComOperacoes,
  deleteOperacaoID,
} = useTicker();

let state = reactive({
  valorTotal: "",
  precoMedioCompra: "",
  carteira: "",
  resultado: '',
  lp: "",
  dialog: {
    width: "500",
    calculadora: false,
  },
});

function toggleCalculadora() {
  if (state.dialog.calculadora) {
    state.dialog.width = "500";
    state.dialog.calculadora = false;
  }
  else {
    state.dialog.width = "1000";
    state.dialog.calculadora = true;
  }

}

async function deletarOperacao() {
  return await deleteOperacaoID(store.editarOperacao.ID).then(async () => {
    await updateOperacoes()
  })


}

function openConfirmar() {
  togleShowModalFixed({
    nome: "editOperacao",
    show: false,
  });
  togleShowModalFixed({ nome: "confirmarDeleteOperacao", show: true });

}


function voltar() {
  if (store.editarOperacao.ID) {
    store.editarOperacao.ID = null;
  }

  togleShowModalFixed({ nome: "confirmarDeleteOperacao", show: false });


  togleShowModalFixed({
    nome: "editOperacao",
    show: false,
  });
}

async function updateOperacoes() {
  await atualizarOperacao(store.editarOperacao).then(async () => {
    // Limpar formulário após adicionar a operação

    await getCorretorasComOperacoes().then(() => {
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
        ticker: null,
        resultado: 0,
        lp: 0,
      };
      state.valorTotal = "";
      state.precoMedioCompra = "";

      voltar();
    });
  });
}

onBeforeMount(async () => {
  await getCorretoras().then(async () => { });
});

/* watch(() => store.editarOperacao.tipoOperacao, () => {
  calcularOperacao();
});
 */

watch(
  () => store.editarOperacao.ID,
  async () => {

    if (store.editarOperacao && store.editarOperacao.ID) {

      await getOperacoesID(store.editarOperacao.ID).then((res: any) => {
        store.editarOperacao.data = store.editarOperacao.data.split("T")[0];
        state.valorTotal = formatarMoeda(store.editarOperacao.valorTotal);

        state.precoMedioCompra = formatarMoeda(store.editarOperacao.precoMedioCompra);

        state.lp = formatarMoeda(store.editarOperacao.lp);
        state.resultado = formatarMoeda(store.editarOperacao.resultado);

        state.carteira = formatarMoeda(store.editarOperacao.carteira);
        store.editarOperacao.valorUnidade = calcularUnidade(
          store.editarOperacao.valorTotal,
          store.editarOperacao.quantidade
        );

        if (store.editarOperacao.ticker.corretora) {
          store.corretoraSelecionada = store.editarOperacao.ticker.corretora;
          store.editarOperacao.tickerId = store.editarOperacao.ticker.ID;
        }

        togleShowModalFixed({ nome: "editOperacao", show: true });
      });
    }
  }
);

watch(
  () => store.corretoraSelecionada,
  (newValue) => {
    getTickersCorretoraID(newValue);
  }
);

watch(
  () => state.resultado,
  (newValue) => {
    store.editarOperacao.resultado = moneyToFloat(newValue);

  }
);

watch(
  () => state.lp,
  (newValue) => {
    store.editarOperacao.lp = moneyToFloat(newValue);
  }
);

watch(
  () => store.editarOperacao.valorTotal,
  (newValue) => {
    store.editarOperacao.valorUnidade = calcularUnidade(
      store.editarOperacao.valorTotal,
      store.editarOperacao.quantidade
    );
  }
);

watch(
  () => store.editarOperacao.quantidade,
  (newValue) => {
    store.editarOperacao.valorUnidade = calcularUnidade(
      store.editarOperacao.valorTotal,
      store.editarOperacao.quantidade
    );
  }
);

watch(
  () => state.valorTotal,
  (newValue) => {
    store.editarOperacao.valorTotal = moneyToFloat(newValue);
  }
);
watch(
  () => state.carteira,
  (newValue) => {
    store.editarOperacao.carteira = moneyToFloat(newValue);
  }
);

watch(
  () => state.precoMedioCompra,
  (newValue) => {
    store.editarOperacao.precoMedioCompra = moneyToFloat(newValue);
  }
);
</script>
