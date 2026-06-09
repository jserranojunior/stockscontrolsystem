<template>

  <el-dialog v-model="modals[nome].show" :modal="true" :width="width" :close-on-click-modal="false"
    :close-on-press-escape="false" :show-close="false">
    <div v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <slot name="body"></slot>



    <slot name="footer"></slot>


  </el-dialog>

</template>


<script lang="ts" setup>
import { useModal } from "./use/useModal";
import { inject, onBeforeMount, reactive, toRefs } from "vue";

interface ModalProps {
  nome: string;
  props?: any;
  mostrar?: boolean;
  titulo?: string;
  width?: string;
}

const props = defineProps<ModalProps>();

const { addModal, modals, togleShowModal } = useModal();

const state = reactive({
  novaModal: { nome: props.nome, show: false },
  nome: "",
  show: props.mostrar ?? false,
  titulo: props.titulo,
  width: props.width ?? "500",
});
onBeforeMount(async () => {
  await addModal(state.novaModal).then(() => {
    state.nome = props.nome;
  });
});
</script>