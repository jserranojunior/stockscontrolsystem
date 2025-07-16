<template>
  <div>
    <efectCircles>
      <div class="absolute top-[25vh] w-full z-10 text-center">
        <img
          src="/logo.png"
          alt="Logo"
          class="mx-auto w-24 h-24 md:w-32 md:h-32"
        />
        <h1 class="text-4xl md:text-5xl font-bold font-sans">
          Stocks Control System
        </h1>
        <p class="text-lg mt-2 font-light">
          Gerencie suas finanças com praticidade e um controle inteligente,
          simples e eficiente.
        </p>
      </div>
    </efectCircles>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import efectCircles from "../components/efectCircles.vue";
</script>
