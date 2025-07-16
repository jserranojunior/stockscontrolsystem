<template>
  <div class="flex justify-center flex-wrap">
    <addNewBank />
    <AddNewTick />
  </div>
  <CorretoraTabela />
</template>
<script setup lang="ts">
import addNewBank from "../mods/tickers/addNewBank.vue";
import AddNewTick from "../mods/tickers/addNewTick.vue";
import CorretoraTabela from "./CorretoraTabela.vue";
</script>
