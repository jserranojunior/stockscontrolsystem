import { reactive } from "vue";

export const storeCalendario = reactive({
  dataAtual: new Date(),
  dataSelecionada: new Date(),
  dataSelecionadaFormatada: "", // will be set after creation
});

// Set dataSelecionadaFormatada after store is initialized
storeCalendario.dataSelecionadaFormatada = storeCalendario.dataSelecionada
  .toISOString()
  .split("T")[0];
