<template>
  <div class="flex">
    <button class="mr-2 btn btn-sm btn-primary" @click="changeDay('-')">
      anterior
    </button>
    <form class="hover:cursor-pointer">
      <input v-model="storeCalendario.dataSelecionadaFormatada" type="date" name="calendario"
        class="input input-sm w-full max-w-xs hover:cursor-pointer" />
    </form>
    <button class="mx-2 btn btn-sm btn-primary" @click="changeDay('+')">
      próximo
    </button>
  </div>
</template>
<script lang="ts" setup>
import { storeCalendario } from "./storeCalendario";
import { reactive, watch } from "vue";


// Função para avançar/voltar um dia
function changeDay(operacao: string) {
  const novaData = new Date(storeCalendario.dataSelecionada); // faz cópia
  novaData.setDate(novaData.getDate() + (operacao === "+" ? 1 : -1));
  storeCalendario.dataSelecionada = novaData;
}

// 🔄 Sincroniza store -> state
watch(
  () => storeCalendario.dataSelecionada,
  (newValue) => {
    storeCalendario.dataSelecionadaFormatada = newValue.toISOString().split("T")[0];
  },
  { immediate: true }
);

// 🔄 Sincroniza state -> store
watch(
  () => storeCalendario.dataSelecionadaFormatada,
  (newValue) => {
    if (!newValue) return;
    const novaData = new Date(newValue + "T00:00:00"); // garante formato yyyy-mm-dd
    storeCalendario.dataSelecionada = novaData;
  }
);
</script>
