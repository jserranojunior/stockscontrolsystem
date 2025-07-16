<template>
  <div class="flex justify-center mx-4">
    <div class="w-full sm:w-1/2 md:w-1/3 card  shadow-xl my-4">
      <div
        v-if="Financial.store.err"
        class="my-1 block text-sm text-gray-300 text-center bg-yellow-800 border border-yellow-900 h-8 items-center p-2 rounded-lg"
        role="alert"
      >{{ Financial.store.err }}</div>
      <div class="p-2 rounded-sm shadow-sm bg-neutral">
        <div class="flex flex-wrap">
          <!-- <label class="pb-2 text-gray-700 font-semibold">Favorecido</label> -->
          <input            
            type="text"
            class="input input-sm w-full"
            name="favorecido"
            placeholder="Favorecido"
            v-model="Financial.store.ContaAPagar.favorecido"
          />
        </div>
        <div class="mt-1 flex flex-wrap pt-2">
          <!-- <label class="pb-2 text-gray-700 font-semibold"  >Descrição</label> -->
          <input
            type="text"
            class="input input-sm w-full"
            name="descricao"
            placeholder="Descrição"
                        v-model="Financial.store.ContaAPagar.descricao"

          />
        </div>

        <div class=" flex flex-wrap">
          <label class="pb-2 label label-text">Valor</label>

          <input type="number"
            class="input input-sm w-full"
            name="valor"
            required
            placeholder="Valor"
            v-model="Financial.store.ContaAPagar.ValoresContasAPagar.valor"
          />
        </div>

        <div class=" flex flex-wrap">
          <label
            for="inicio_data_pagamento"
            class="pb-2 label label-text"
          >Inicio Pagamento</label>
          <input
            v-model="Financial.store.inicioDataPagamentoWithouFormated"
            type="date"
            class="input input-sm w-full"
            placeholder="dd/mm/aaaa"
            required
          />
        </div>

        <div class="flex flex-wrap">
          <label for="fim_data_pagamento" class="pb-2 label label-text">Fim Pagamento</label>
          <input
            v-model="Financial.store.fimDataPagamentoWithouFormated"
            type="date"
            class="input input-sm w-full"
            placeholder="dd/mm/aaaa"
          />

        </div>
        <div class="mt-1 flex flex-wrap pt-2">
          <select
            v-model="Financial.store.ContaAPagar.categorias_contas_a_pagar_id"
            name="categorias_contas_a_pagar_id"
            required
            class="select select-sm w-full"
          >
            <option value="1">Essenciais</option>
            <option value="2">Compras</option>
            <option value="3">Urgencias</option>

            <option value="4">Lazer</option>
            <option value="5">Transporte</option>
            <option value="6">Alimentação</option>
            <option value="7">Estudos</option>
            <option value="8">Avulsos</option>
            <option value="9">Empresa</option>
            <option value="10">Mercado</option>
            <option value="11">Saúde</option>
          </select>
        </div>

        <div class="mt-1 flex flex-wrap pt-2">
          <select v-model="Financial.store.ContaAPagar.tipo_conta" name="tipo_conta" required class="select  select-sm w-full">
            <option disabled selected value="Tipo de Conta">Tipo de Conta</option>
            <option value="Extra">Extra</option>
            <option value="Fixa">Fixa</option>
            <option value="Parcelada">Parcelada</option>
          </select>
        </div>

        <div class="mt-1 flex flex-wrap pt-2">
          <select
            v-model="Financial.store.ContaAPagar.forma_pagamento"
            name="forma_pagamento"
            required
            class="select  select-sm w-full"
          >
            <option disabled selected value="Forma de Pagamento">Forma de Pagamento</option>
            <option value="Cartão">Cartão</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Débito">Débito</option>
            <option value="Débito Automatico">Débito Automatico</option>
            <option value="Terceiro">Terceiro</option>
          </select>
        </div>

        <div class="mt-2 flex flex-wrap justify-between">
          <div class="w-1/2">
            <router-link to="/financeiro">
              <button class="btn btn-secondary btn-sm">Voltar</button>
            </router-link>
          </div>
          <div class="w-1/2 text-right">
            <button
              v-if="Financial.store.mode === 'add'"
              class="btn btn-primary btn-sm"
              @click="addBills()"
            >Cadastrar</button>
            <button v-else class="btn btn-sm btn-primary" @click="updateBill">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { onMounted } from "vue";
        import useStore from "../../../helpers/stores/store"
        import Financial from "../composables/Financial"

import { onBeforeMount } from '@vue/runtime-core';
        let {router} = useStore()

    function setMode() {
      Financial.setEditAddMode(Financial.store.mode).then((res) => {
        if (res === "add") {
          Financial.setEditAddMode("add");
          Financial.setValuesFormBillsToPay()
        }
      });
    }

    function addBills(){
      Financial.storeBillsToPay().then(()=>{
        router.push("/financeiro")
      })
      
    }

    function updateBill(){
      Financial.updateBillsToPay().then(()=>{
        router.push("/financeiro")
      })
      
    }

    onBeforeMount(() => {
      setMode();
    });

</script>
