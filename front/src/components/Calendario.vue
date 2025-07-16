<template>
  <div class="flex">
    <button class="mr-2 btn btn-sm btn-primary" @click="changeMonth('-')">
      anterior
    </button>
    <form class="hover:cursor-pointer">
      <input
        v-model="Financial.store.Calendario.selectedDate"
        type="date"
        name="calendario"
        class="input input-sm w-full max-w-xs hover:cursor-pointer"
      />
    </form>
    <button class="mx-2 btn btn-sm btn-primary" @click="changeMonth('+')">
      próximo
    </button>
  </div>
</template>
<script lang="ts" setup>
import { watch } from "vue";
import Financial from "../mods/financeiro/composables/Financial";
import { dateFormatUs } from "alvitre-obelisk";

function alterarMeses(data: Date, operacao: string) {
  var novaData = new Date(data);
  let operacaoCompleta = null;
  if (operacao == "-") {
    operacaoCompleta = novaData.getMonth() - 1;
  } else {
    operacaoCompleta = novaData.getMonth() + 1;
  }
  novaData.setMonth(operacaoCompleta);
  return novaData;
}

function changeMonth(operacao: string) {
  const dateActual = new Date(Financial.store.Calendario.selectedDate);
  let newDate = dateFormatUs(alterarMeses(dateActual, operacao));
  Financial.store.Calendario.selectedDate = newDate;
}

/*     watch(() => Financial.store.Calendario.selectedDate, async () => {
      Financial.setDataCalendario(Financial.store.Calendario.selectedDate);
        await   Financial.getSetCategoriasContas()

    }); */
watch(
  () => Financial.store.Calendario.selectedDate,
  async () => {
    Financial.setDataCalendario(Financial.store.Calendario.selectedDate);
    await Financial.GetBillsMonth(1);
  }
);
</script>
