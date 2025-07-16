<template>
  <div class="flex flex-wrap ">
    <div class="w-full  p-2">
      <div class="w-full bg-blue-600 p-1 rounded-md text-center font-bold text-sm  text-white">

TOTAIS
</div>
      <div class="bg-base-300 rounded-lg shadow-xl p-4 ">
                
        <div>
          <div v-if="Financial.store.categoriaContas && Financial.store.categoriaContas.SomaFormaPagamento">
            <div
              v-for="(index, formaPagamento) in Financial.store.categoriaContas.SomaFormaPagamento"
              :key="index"
              class="painel-body p-1"
            >
              <div class="flex flex-wrap">
                <div class="w-2/3 text-sm">{{ formaPagamento }}</div>
                <div v-if="formaPagamento" class="w-1/3 text-right text-sm">{{ money(index) }}</div>
                <div v-else class="w-1/4">{{ money(0) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-2  border-t pt-2">
        <div class="font-semibold">Total</div>
        <div class="font-semibold" v-if="Financial.store.categoriaContas && Financial.store.categoriaContas.TotalCategories">{{ money(Financial.store.categoriaContas.TotalCategories) }}</div>
      </div>

      
        
      </div>

    </div>

    <div class="w-full p-2">
      <div class="w-full bg-green-600 p-1 rounded-md text-center font-bold text-sm  text-white">
          CAIXA / FREELAS
        </div>
      <div class="bg-base-300 rounded-lg shadow-xl p-4 mt-1">
        
        <div class="painel-body p-1">
          <div class="flex flex-wrap justify-between text-center mt-1 p-1 text-sm">
            <div>Ls Star</div>
            <div>0,00</div>
          </div>
          <div class="flex flex-wrap justify-between text-center mt-1 p-1 text-sm">
            <div>Acolher</div>
            <div>0,00</div>
          </div>
        </div>
        <div class="flex justify-between mt-2  border-t pt-2">
        <div class="font-semibold">Total</div>
        <div class="font-semibold">{{ money(0) }}</div>
      </div>

       
      </div>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { money } from "../../../helpers/filters/filters";
import Financial from "../composables/Financial"

</script>
