<template>


  <Modal :nome="'modalCalculadora'" class="z-100">
    <template #header>


    </template>
    <template #body>
      <div class="flex mx-auto">
        <div class="w-auto mx-auto">
          <Calculator :title="props.title" :description="props.description" :defaultMode="props.defaultMode"
            :locale="props.locale" />
        </div>
      </div>
    </template>
    <template #footer>


      <div class="flex justify-center">
        <div><button class="btn btn-warning mt-4 mx-auto text-center"
            @click="togleShowModalFixed({ nome: 'modalCalculadora', show: false })">Fechar</button></div>
      </div>
    </template>
  </Modal>

</template>


<script setup>
import Modal from "../modals/Modal.vue";
import Calculator from "./src/Calculator.vue";
import { useModal } from "../modals/use/useModal";
const { togleShowModalFixed } = useModal();
// Declara as props que o componente pai vai receber
const props = defineProps({
  title: {
    type: String,
    default: "Calculadora Avançada Vue",
  },
  description: {
    type: String,
    default: "Uma calculadora avançada com várias funcionalidades.",
  },
  defaultMode: {
    type: String,
    default: "scientific",
  },
  locale: {
    type: String,
    default: "br",
  },
});

</script>
