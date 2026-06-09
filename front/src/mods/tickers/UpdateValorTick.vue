<template>
  <Modal :nome="'atualizartick'" v-if="store.ativoSelecionado">
    <template #header>
      <h3 class="text-lg font-bold">Atualizar Valor Atual</h3>
      <p class="py-4">{{ store.ativoSelecionado.tick }}</p>
    </template>
    <template #body>

      <input type="text" placeholder="0,00" class="input input-bordered w-full"
        v-model="store.ativoSelecionado.valorSemFormatar"
        @blur="store.ativoSelecionado.valorSemFormatar = formatCurrencyExcel(store.ativoSelecionado.valorSemFormatar)" />

    </template>
    <template #footer>
      <button class="btn btn-success mt-4 float-right mx-1" @click="atualizarValorTick()">Atualizar</button>

      <button class="btn btn-warning mt-4 float-right mx-1"
        @click="togleShowModalFixed({ nome: 'atualizartick', show: false })">Fechar</button>
    </template>
  </Modal>

</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { store } from "./composables/storeTicker"

import { useModal } from "../../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();
import { formatCurrencyExcel, formatarMoeda } from "../../helpers/mask/moneyMask";

import { useTicker } from "./composables/useTicker";
const { adicionarValorTicker, getCorretorasComOperacoesPerformance } = useTicker();

import moneyToFloat from "../../helpers/filters/moneyToFloat";
import Modal from "../../components/modals/Modal.vue";


onBeforeMount(async () => {
  window.addEventListener("keydown", handleKeydown)
});


function handleKeydown(e: any) {
  if (store.ativoSelecionado && store.ativoSelecionado.valorSemFormatar) {
    if (e.key === "Enter") {
      e.preventDefault()
      store.ativoSelecionado.valorSemFormatar = formatCurrencyExcel(store.ativoSelecionado.valorSemFormatar)
      atualizarValorTick()
    }
  }
}

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
})

async function atualizarValorTick() {

  if (store.ativoSelecionado) {
    store.ativoSelecionado.dataAtualizacaoPrecoAtual = dataHoraAtual()
    store.ativoSelecionado.precoAtual = moneyToFloat(store.ativoSelecionado.valorSemFormatar)
  }

  store.novoValorTicker.tickerId = store.ativoSelecionado.id
  store.novoValorTicker.data = dataHoraAtual()
  store.novoValorTicker.valorAtual = store.ativoSelecionado.precoAtual




  await adicionarValorTicker().then(async () => {
    store.ativoSelecionado.precoAtual = String(store.ativoSelecionado.precoAtual)
    console.log(store.novoValorTicker, "store.novoValorTicker")
    await getCorretorasComOperacoesPerformance().then(() => {
      togleShowModalFixed({ nome: "atualizartick", show: false });

    })

  }
  )


  /*  unh 265,86 */
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

</script>