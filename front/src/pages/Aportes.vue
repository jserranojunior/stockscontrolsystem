<template>

  <NovoAporte></NovoAporte>

  <div class="flex flex-wrap justify-center p-1 mt-4">
    <div class=" max-w-4xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <div class="w-full card shadow-xl m-0 rounded-2xl mb-10 p-2">
          <div class="flex"> <button class="float-right ml-auto mr-3 btn  btn-primary"
              @click="togleShowModalFixed({ nome: 'modalAporte', show: true })">+
              Novo
              Aporte</button></div>
          <div class="card-body p-0 m-0 rounded-2xl">
            <h2 class="card-title p-1 m-0 rounded-t-2xl text-center justify-center">
              APORTES
            </h2>

            <table class="table  w-full min-w-[800px] text-md bg-base-100">
              <thead class="text-black">
                <tr>
                  <td class="text-left">
                    Data do aporte
                  </td>
                  <td class="text-left">
                    Valor
                  </td>

                </tr>
              </thead>
              <tbody>
                <tr v-for="aporte in store.aportes" :key="aporte.ID">
                  <td v-if="aporte.data">
                    {{ formatarData(aporte.data) }}
                  </td>
                  <td v-if="aporte.valor">
                    {{ formatarMoeda(aporte.valor) }}
                  </td>
                  <td class="text-center"><button class="btn btn-error btn-sm">Excluir</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { store } from "../mods/aportes/composables/storeAportes";
import { useAportes } from "../mods/aportes/composables/useAportes";
import { formatarMoeda } from "../helpers/mask/moneyMask";
import { useModal } from "../components/modals/use/useModal";
import NovoAporte from "../mods/aportes/NovoAporte.vue";
const { togleShowModalFixed } = useModal();
const { getAportes } = useAportes();

onBeforeMount(async () => {
  await getAportes();
});

function formatarData(dataISO: string): string {
  return new Date(dataISO).toLocaleString("pt-BR");
}

</script>