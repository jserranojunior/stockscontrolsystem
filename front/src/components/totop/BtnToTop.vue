<template>
  <button @click="toTop()" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" aria-label="To Top"
    class="z-10 cursor-pointer inline-block p-3 bg-success text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out bottom-15 right-5 fixed"
    id="btn-back-to-top">
    <Icon icon="tabler:home-up" width="28" />
  </button>
</template>

<script setup lang="ts">
function toTop() {
  window.scrollTo(0, 0)
}
</script>
