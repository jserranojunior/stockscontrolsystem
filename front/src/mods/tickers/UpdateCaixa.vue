<template>

  <Modal :nome="'atualizarcaixa'">
    <template #header>
      <h3 class="text-lg font-bold">Atualizar Caixa</h3>

    </template>
    <template #body>
      <input type="text" v-model="state.valor" placeholder="Digite o valor" class="input input-bordered w-full"
        @blur="state.valor = formatCurrencyExcel(state.valor)" autofocus />

    </template>
    <template #footer>
      <button class="btn btn-primary mt-4" @click="salvar">
        Salvar
      </button>

      <button class="btn btn-warning mt-4 float-right mx-1"
        @click="togleShowModalFixed({ nome: 'atualizarcaixa', show: false })">Fechar</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { store } from './composables/storeTicker';
import { useTicker } from './composables/useTicker';
import { useModal } from '../../components/modals/use/useModal';
import Modal from "../../components/modals/Modal.vue";
import { formatCurrencyExcel, formatarMoeda } from "../../helpers/mask/moneyMask";
import moneyToFloat from "../../helpers/filters/moneyToFloat";
import { onBeforeMount, onBeforeUnmount, reactive, watch } from 'vue';
const { atualizarCorretora, getCorretorasComOperacoesPerformance } = useTicker();
const { togleShowModalFixed } = useModal();

const state = reactive({
  valor: "",
});



/* watch(() => store.corretoraSelecionada, (newValue) => {
  if (store.caixa[0] && store.caixa[0].ID) {
    state.valor = formatarMoeda(store.caixa[0].valor);
  }
}) */

async function salvar() {
  if (store.corretoraSelecionada && store.corretoraSelecionada.ID) {

    const data = {
      id: store.corretoraSelecionada.ID,
      disponivel: moneyToFloat(state.valor)
    }

    await atualizarCorretora(data).then(async () => {
      await getCorretorasComOperacoesPerformance().then((res: any) => {
        togleShowModalFixed({ nome: 'atualizarcaixa', show: false });
      });

    });
  }

  state.valor = ""

}

function handleKeydown(e: any) {
  if (e.key === "Enter") {
    e.preventDefault()
    state.valor = formatCurrencyExcel(state.valor)
    salvar()
  }
}


onBeforeMount(async () => {
  if (store.corretoraSelecionada && store.corretoraSelecionada.ID) {
    state.valor = formatarMoeda(store.corretoraSelecionada.disponivel);
  }
  window.addEventListener("keydown", handleKeydown)

});



onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
})

</script>