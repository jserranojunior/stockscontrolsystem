<template>

  <Dialog :nome="'modalAporte'" class="z-99" :width="'500px'">
    <template #header>
      <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Novo Aporte
      </h2>
    </template>
    <template #body>
      <div class="p-2 text-black">
        <div class="card bg-base-200 rounded-2xl p-4">





          <!--  <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-medium">Data do Aporte</span>
            </label>
            <div class="relative">
              <input v-model="store.novoaporte.data" type="date" class="input input-bordered w-full" />
            </div>
          </div> -->

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-medium">Valor</span>
            </label>
            <div class="relative">
              <input v-model="state.valor" type="text" class="input input-bordered w-full"
                @blur="state.valor = formatCurrencyExcel(state.valor)" />
            </div>
          </div>



        </div>
      </div>
    </template>
    <template #footer>
      <div class="form-control mt-4 mx-4">

        <div class="flex justify-end gap-2">
          <div class="btn btn-success" @click="addAporte()">Cadastrar</div>
          <div class="btn btn-warning" @click="closeModalAporte()">Voltar</div>
        </div>
      </div>
    </template>
  </Dialog>
</template>


<script setup lang="ts">
import { onBeforeMount, reactive, Reactive, watch } from 'vue';
import { formatCurrencyExcel } from '../../helpers/mask/moneyMask';
import { store } from './composables/storeAportes';
import { useModal } from '../../components/modals/use/useModal';
import Dialog from '../../components/modals/Dialog.vue';
import { useAportes } from './composables/useAportes';

const { adicionarAporte, getAportes } = useAportes();
const { togleShowModalFixed } = useModal();
import moneyToFloat from '../../helpers/filters/moneyToFloat';

const state = reactive({
  valor: "0" as string,
})

async function addAporte() {
  await adicionarAporte().then(async (res: any) => {
    await getAportes()
    closeModalAporte()


  })

}

function closeModalAporte(): void {
  togleShowModalFixed({
    nome: "modalAporte",
    show: false,
  });
}

onBeforeMount(() => {
  console.log("onBeforeMount")
})

watch(
  () => state.valor,
  (newValue) => {
    store.novoaporte.valor = moneyToFloat(newValue);
  }
)

</script>