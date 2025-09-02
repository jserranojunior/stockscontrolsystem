<template>
  <div>
    <Modal :nome="props.nomeModalConfirmacao">
      <template #body>
        <div class="flex">
          <div class="w-full">
            <slot name="body"></slot>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="w-full">
          <div class="flex flex-wrap mt-1 justify-between">
            <div class="w-auto">
              <button class="btn btn-warning m-1" @click="cancelar()">Cancelar</button>
            </div>
            <div class="w-auto ml-1">
              <button v-if="state.btnConfirmacao == 0" class="btn  btn-success m-1">
                <span class="loading w-8 loading-spinner"></span>

              </button>
              <button v-else class="btn  btn-success m-1" @click="confirmacao()">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import Modal from "./Modal.vue";
const state = reactive({
  btnConfirmacao: 1,
});
const props = defineProps({
  nomeModalConfirmacao: {
    type: String,
    default: "",
  },
  functionConfirmarModal: Function,
  functionCancelarModal: Function,
});

function cancelar() {
  if (props.functionCancelarModal) {
    props.functionCancelarModal();
  }
}

async function confirmacao() {
  if (props.functionConfirmarModal) {
    state.btnConfirmacao = 0;
    await props
      .functionConfirmarModal()
      .then(() => {
        setTimeout(() => {
          state.btnConfirmacao = 1;
        }, 2000);
      })
      .catch((erro: any) => {
        console.error(erro);
        setTimeout(() => {
          state.btnConfirmacao = 1;
        }, 2000);
      });
  }
}
</script>
