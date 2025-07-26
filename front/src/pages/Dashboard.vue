<template>
  <div class="flex flex-wrap justify-center items-center my-4">
    <Cotacoes></Cotacoes>
  </div>

  <Favorites></Favorites>

  <div class="flex justify-center">
    <!-- Card de Horários -->
    <Hora></Hora>
    <!-- Calendário -->
  </div>

  <div class="flex flex-wrap justify-center">
    <!-- Card Favoritos -->

    <!-- Conversores -->
    <div class="w-full md:w-2/8 p-4">
      <DolarConversor :usdRate="rates.usdbrl" />
    </div>
    <div class="w-full md:w-2/8 p-4">
      <EuroConversor :eurRate="rates.eurbrl" />
    </div>

    <div class="w-full xs:w-2/6 p-2 sm:w-full md:w-2/6">
      <Calendario />
    </div>
  </div>
  <div class="flex justify-center items-center flex-wrap"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import EuroConversor from "../mods/dashbord/components/EuroConversor.vue";
import DolarConversor from "../mods/dashbord/components/DolarConversor.vue";
import Calendario from "../mods/dashbord/components/Calendario.vue";
import Cotacoes from "../mods/dashbord/components/Cotacoes.vue";
import Hora from "../mods/dashbord/components/Hora.vue";
import { useCotacoes } from "../mods/dashbord/composables/useCotacoes";
import Favorites from "../mods/dashbord/components/Favorites.vue";
const { rates } = useCotacoes();
// Favoritos
</script>
