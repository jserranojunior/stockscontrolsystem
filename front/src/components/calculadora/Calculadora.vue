<template>



  <div class="flex mx-auto">
    <div class="w-auto mx-auto">
      <Calculator :title="props.title" :description="props.description" :defaultMode="props.defaultMode"
        :locale="props.locale" />
    </div>
  </div>



</template>


<script setup>
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
