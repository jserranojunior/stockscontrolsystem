<template>
  <div class="p-2 space-y-10 mx-6">
    <div class="card bg-base-200 rounded-2xl p-4">
      <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Nova Operação
      </h2>

      <form @submit.prevent="adicionarOperacao" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Data -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Data da Operação</span>
            </label>
            <div class="relative">
              <input
                type="date"
                v-model="store.novaOperacao.data"
                class="input input-bordered w-full pl-10"
                required
              />
              <span class="absolute left-3 top-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Corretora</span>
            </label>
            <div class="relative">
              <select
                name="corretora"
                id="corretora"
                class="cursor-pointer select select-bordered w-full"
              >
                <option value="corretora1">Corretora 1</option>
                <option value="corretora2">Corretora 2</option>
                <option value="corretora3">Corretora 3</option>
              </select>
            </div>
          </div>

          <!-- Ativo -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Tick</span>
            </label>
            <div class="relative">
              <select
                v-model="store.novaOperacao.tick"
                name="tick"
                id="tick"
                class="cursor-pointer select select-bordered w-full"
              >
                <option value="TSLA34">TSLA34</option>
                <option value="AMAZ01">AMAZ01</option>
                <option value="GOOG01">GOOG01</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Campos dinâmicos -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Tipo Operação -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Tipo de Operação</span>
            </label>
            <select
              v-model="store.tipoOperacao"
              class="select select-bordered w-full"
              @change="
                store.tipoOperacao === 'venda'
                  ? (store.novaOperacao.qtdCompra = null)
                  : (store.novaOperacao.qtdVenda = null)
              "
            >
              <option value="compra" class="text-success">Compra</option>
              <option value="venda" class="text-error">Venda</option>
            </select>
          </div>

          <!-- Quantidade Compra -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Quantidade</span>
            </label>
            <div class="relative">
              <input
                type="number"
                v-model="store.novaOperacao.qtdCompra"
                class="input input-bordered w-full"
                min="1"
                placeholder="Nº de ações"
              />
              <span class="absolute right-3 top-3 text-gray-400">un</span>
            </div>
          </div>

          <!-- Valor Compra -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Valor Compra</span>
            </label>
            <div class="relative">
              <span class="absolute left-3 top-3">R$</span>
              <input
                type="number"
                v-model="store.novaOperacao.valorCompra"
                class="input input-bordered w-full pl-10"
                step="0.01"
                min="0.01"
                placeholder="0,00"
              />
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
          v-if="store.tipoOperacao === 'venda'"
        >
          <!-- Quantidade Venda -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Quantidade</span>
            </label>
            <div class="relative">
              <input
                type="number"
                v-model="store.novaOperacao.qtdVenda"
                class="input input-bordered w-full"
                min="1"
                placeholder="Nº de ações"
              />
              <span class="absolute right-3 top-3 text-gray-400">un</span>
            </div>
          </div>

          <!-- Valor Venda -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Valor Unitário</span>
            </label>
            <div class="relative">
              <span class="absolute left-3 top-3">R$</span>
              <input
                type="number"
                v-model="store.novaOperacao.valorVenda"
                class="input input-bordered w-full pl-10"
                step="0.01"
                min="0.01"
                placeholder="0,00"
              />
            </div>
          </div>
        </div>

        <!-- Botão Submit -->
        <div class="pt-2">
          <button
            type="submit"
            class="btn btn-primary w-full md:w-auto gap-2"
            :class="{
              'btn-success': store.tipoOperacao === 'compra',
              'btn-error': store.tipoOperacao === 'venda',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{
              store.tipoOperacao === "compra"
                ? "Registrar Compra"
                : "Registrar Venda"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from "./composables/storeTicker";
import { useTicker } from "./composables/useTicker";

const { adicionarOperacao } = useTicker();
</script>
