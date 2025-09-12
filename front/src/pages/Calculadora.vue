<template>
  <Dialog :nome="'modalCalculadora'" class="z-99">
    <template #header>
      <div class="flex justify-between mt-2">
        <div>
          <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
            Calculadora
          </h2>
        </div>


      </div>
    </template>
    <template #body>
      <Calculadora></Calculadora>


    </template>
    <template #footer>
      <div class="flex justify-end">
        <div class="pt-2 float-right mx-2">
          <button class="btn btn-warning w-full md:w-auto gap-2" @click="voltar()">
            Voltar
          </button>
        </div>

      </div>
    </template>
  </Dialog>




</template>

<script setup lang="ts">
import Calculadora from "../components/calculadora/Calculadora.vue";
import Dialog from "../components/modals/Dialog.vue";
import { useModal } from "../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();

function voltar() {
  togleShowModalFixed({ nome: "modalCalculadora", show: false });
}
</script>
