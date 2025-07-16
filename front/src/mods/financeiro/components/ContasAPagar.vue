<template>
  <div class="card w-full">
    <div class="card-body bg-base-200">
      <h2 class="card-title">Contas a pagar</h2>
      <div class="overflow-x-auto">
        <table
          class="table table-compact w-full border bg-base-100 border-gray-800"
        >
          <thead>
            <tr class="border-gray-800">
              <th>Favorecido</th>
              <th>Valor</th>
              <th class="text-right">Ínicio data pagamento</th>
              <th class="text-right">Fim data pagamento</th>

              <th>Forma de pagamento</th>
              <th>Tipo de conta</th>

              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(bill, index) in Financial.store.BillsToPay"
              :key="index"
              class="hover:bg-base-100 cursor-pointer border-gray-800"
            >
              <td>{{ bill.favorecido }}</td>
              <td>{{ money(bill.ValoresContasAPagar.valor) }}</td>
              <td class="text-right">
                {{ dateFormatPtbr(bill.inicio_data_pagamento) }}
              </td>
              <td class="text-right">
                {{ dateFormatPtbr(bill.fim_data_pagamento) }}
              </td>

              <td>{{ bill.forma_pagamento }}</td>
              <td>{{ bill.tipo_conta }}</td>

              <td>{{ bill.descricao }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount } from "vue";
import Financial from "../composables/Financial";
import { dateFormatPtbr } from "alvitre-obelisk";
import { money } from "../../../helpers/filters/filters";
onBeforeMount(async () => {
  console.log(
    "ContasAPagar.vue onBeforeMount",
    await Financial.GetBillsMonth(1)
  );
  /*   await Financial.GetBillsMonth(49).then((res) => {
    Financial.store.ContaAPagar = res;
  }); */
});
</script>
