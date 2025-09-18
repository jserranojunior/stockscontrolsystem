<template>


  <Modal :nome="'atualizarcaixa'" v-if="store.caixa[0] && store.caixa[0].ID">
    <template #header>
      <h3 class="text-lg font-bold">Atualizar Caixa</h3>

    </template>
    <template #body>
      <input type="text" v-model="state.valor" placeholder="Digite o valor" class="input input-bordered w-full"
        @blur="state.valor = formatCurrencyExcel(state.valor)" />

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
import { store } from '../composables/storeCaixa';
import { useCaixa } from '../composables/useCaixa';
import { useModal } from '../../../components/modals/use/useModal';
import Modal from "../../../components/modals/Modal.vue";
import { formatCurrencyExcel, formatarMoeda } from "../../../helpers/mask/moneyMask";
import moneyToFloat from "../../../helpers/filters/moneyToFloat";
import { onBeforeMount, onBeforeUnmount, reactive, watch } from 'vue';

const { togleShowModalFixed } = useModal();

const state = reactive({
  valor: "0.00",
});



watch(() => store.caixa, (newValue) => {
  if (store.caixa[0] && store.caixa[0].ID) {
    state.valor = formatarMoeda(store.caixa[0].valor);
  }

})

async function salvar() {
  if (store.caixa[0] && store.caixa[0].ID) {
    store.caixa[0].valor = moneyToFloat(state.valor);

    await useCaixa().atualizarCaixa(store.caixa[0]).then(() => {
      togleShowModalFixed({ nome: 'atualizarcaixa', show: false });
    });
  }

}

function handleKeydown(e: any) {
  if (e.key === "Enter") {
    e.preventDefault()
    state.valor = formatCurrencyExcel(state.valor)
    salvar()
  }
}


onBeforeMount(async () => {
  if (store.caixa[0] && store.caixa[0].ID) {
    state.valor = formatarMoeda(store.caixa[0].valor);
  }
  window.addEventListener("keydown", handleKeydown)

});



onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
})

</script>