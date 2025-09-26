<template>
  <Dialog :nome="'addnewTick'" class="z-99" :width="'500px'">
    <template #header>
      <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Novo Tick
      </h2>
    </template>
    <template #body>
      <div class="p-2 text-black">
        <div class="card bg-base-200 rounded-2xl p-4">




          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Corretora</span>
            </label>
            <div class="relative">
              <select name="corretora" id="corretora" class="cursor-pointer select select-bordered w-full"
                v-model="store.novoTicker.corretora">
                <option :value="corretora.ID" v-for="corretora in store.corretoras">
                  {{ corretora.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-medium">Código do Tick</span>
            </label>
            <div class="relative">
              <input v-model="store.novoTicker.tick" type="text" class="input input-bordered w-full" min="1"
                placeholder="Nome do Tick" />
            </div>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-medium">Nome do Tick</span>
            </label>
            <div class="relative">
              <input v-model="store.novoTicker.name" type="text" class="input input-bordered w-full" min="1"
                placeholder="Nome do Tick" />
            </div>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-medium">Data de compra</span>
            </label>
            <div class="relative">
              <input v-model="store.novoTicker.datacompra" type="date" class="input input-bordered w-full" />
            </div>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-medium">Preço Atual</span>
            </label>
            <div class="relative">
              <input v-model="state.precoAtual" type="text" class="input input-bordered w-full"
                @blur="state.precoAtual = formatCurrencyExcel(state.precoAtual)" />
            </div>
          </div>



        </div>
      </div>
    </template>
    <template #footer>
      <div class="form-control mt-4 mx-4">

        <div class="flex justify-end gap-2">
          <div class="btn btn-success" @click="addTicker()">Cadastrar</div>
          <div class="btn btn-warning" @click="closeModalAddNewTick()">Voltar</div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, reactive, watch } from "vue";
import { store } from "./composables/storeTicker";
import { useTicker } from './composables/useTicker'
const { adicionarTicker } = useTicker()
import { formatCurrencyExcel, parseMoeda } from "../../helpers/mask/moneyMask";
import Dialog from "../../components/modals/Dialog.vue";
import { useModal } from "../../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();
async function addTicker() {
  await adicionarTicker().then((res: any) => {
    state.precoAtual = "0"
    console.log("res", res)
    if (res == true) {
      closeModalAddNewTick()
    }
  });
}

const state = reactive({
  precoAtual: "0" as string,
});

watch(
  () => state.precoAtual,
  () => {
    store.novoTicker.precoAtual = parseMoeda(state.precoAtual);

  }
);




function closeModalAddNewTick() {
  togleShowModalFixed({
    nome: "addnewTick",
    show: false,
  });
};



function handleKeydown(e: any) {
  if (e.key === "Enter") {
    e.preventDefault()
    state.precoAtual = formatCurrencyExcel(state.precoAtual)
    addTicker()
  }
}


onBeforeMount(async () => {
  window.addEventListener("keydown", handleKeydown)
});



onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
})
</script>
