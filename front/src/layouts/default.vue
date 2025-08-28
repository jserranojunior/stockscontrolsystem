<template>
  <BtnToTop></BtnToTop>
  <div class="bg-base-100">
    <nav class="navbar border-b border-base-200 bg-white fixed top-0 z-10">
      <slot name="header"></slot>
    </nav>
    <div class="drawer min-h-screen">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <slot name="mainpage"></slot>
      </div>
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, inject, watch } from "vue";
import { useAuth } from "../mods/auth/use/useAuth";
import BtnToTop from "../components/totop/BtnToTop.vue";
const { isLogged, getUserID, setRoutesEnableAuth } = useAuth();
onBeforeMount(async () => {
  await isLogged().then(async (res) => {
    if (res) {
      await getUserID().then(() => { });
    }
  });
});
</script>
