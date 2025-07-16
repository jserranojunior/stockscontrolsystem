<template>
  <div>
    <AddEditContas></AddEditContas>
  </div>
</template>
<script lang="ts" setup>
import AddEditContas from '../mods/financeiro/components/AddEditContas.vue'
 import useStore from "../helpers/stores/store"
        let {financeiro} = useStore()
        financeiro.setMode("add")

</script>