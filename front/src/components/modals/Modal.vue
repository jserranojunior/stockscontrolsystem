<template>

  <div v-if="modals[nome] && modals[nome].show" class="modal modal-open">
    <div class="modal-box">
      <div v-if="$slots.header">

        <slot name="header"></slot>


      </div>

      <div class="">
        <form method="dialog">

          <slot name="body"></slot>




        </form>
      </div>
      <div>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>


</template>

<script lang="ts" setup>
import { useModal } from "./use/useModal";
import { inject, onBeforeMount, reactive, toRefs } from "vue";

interface ModalProps {
  nome: string
  props?: any
  mostrar?: boolean
  titulo?: string
}

const props = defineProps<ModalProps>()


const { addModal, modals, togleShowModal } = useModal()

const state = reactive({
  novaModal: { nome: props.nome, show: false },
  nome: "",
  show: props.mostrar ?? false,
  titulo: props.titulo
})
onBeforeMount(async () => {
  await addModal(state.novaModal).then(() => {
    state.nome = props.nome
  })

})

</script>
