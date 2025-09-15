<template>
  <UpdateCaixa />

  <div class="card w-96 bg-base-100 shadow-xl mx-auto my-6">
    <div class="card-body items-center text-center cursor-pointer" @click="openModalAtualizar">
      <h2 class="card-title">Caixa Disponível</h2>
      <p class="text-2xl font-bold text-primary " v-if="store.caixa[0]">
        <span v-if="store.caixa[0] && store.caixa[0].valor">R$ {{ formatarMoeda(store.caixa[0].valor) }}</span>
        <span v-else>R$ {{ formatarMoeda(0) }}</span>

      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { store } from '../composables/storeCaixa';
import { useCaixa } from '../composables/useCaixa';
import { onBeforeMount } from 'vue';
import { useModal } from '../../../components/modals/use/useModal';
import UpdateCaixa from './UpdateCaixa.vue';
import { formatarMoeda } from '../../../helpers/mask/moneyMask';

const { togleShowModalFixed } = useModal();

const { carregarCaixa } = useCaixa();

function openModalAtualizar() {
  togleShowModalFixed({ nome: 'atualizarcaixa', show: true });
}
onBeforeMount(async () => {
  await carregarCaixa();
});


</script>
