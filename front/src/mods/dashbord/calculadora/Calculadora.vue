<script setup>
import Calculator from "./src/Calculator.vue";

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

<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">Calculadora</h2>
      <!-- Passa as props para o componente Calculator -->
      <Calculator
        :title="props.title"
        :description="props.description"
        :defaultMode="props.defaultMode"
        :locale="props.locale"
      />
    </div>
  </div>
</template>
