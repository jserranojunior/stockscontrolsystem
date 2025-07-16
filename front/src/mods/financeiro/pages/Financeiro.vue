<template>
  <div>
    <div class="flex flex-wrap rounded-xl bg-base-100 p-1 justify-center">
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 p-1"></div>
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 p-1">
        <div class="flex justify-center">
          <Calendario />
        </div>
      </div>
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 text-right p-1">
        <button
          class="btn btn-warning btn-sm cursor-pointer"
          @click="openModalAddBillsToPay()"
        >
          Nova conta
        </button>
      </div>
    </div>

    <div class="flex flex-wrap mt-1 justify-center border border-gray-700">
      <hr class="border-t border-gray-600 w-full mb-1" />
      <div class="w-full p-2 rounded-xl">
        <ContasAPagar />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calendario from "../../../components/Calendario.vue";
import ContasAPagar from "../components/ContasAPagar.vue";
import Financial from "../composables/Financial";

import useStore from "../../../helpers/stores/store";
import { onBeforeMount } from "vue";
let { router } = useStore();

/* onBeforeMount(async () => {
  await Financial.getSetCategoriasContas();
}); */

function openModalAddBillsToPay() {
  Financial.store.mode = "add";
  router.push("/financeiroaddconta");
}
</script>
