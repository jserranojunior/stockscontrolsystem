<template>
  <div class="flex justify-center items-center flex-wrap my-4">
    <div class="w-full">
      <Calculadora></Calculadora>
    </div>
  </div>
  <div
    class="text-neutral rounded-xl w-full  px-2 flex flex-wrap justify-between my-1 items-center mx-2 fixed top-0 z-10 bg-gray-100">
    <div class="flex-1">
      <label for="my-drawer" class="btn btn-sm drawer-button cursor-pointer">
        <Icon icon="ic:sharp-menu" width="24" height="24"></Icon>
      </label>
      <slot name="title"></slot>
    </div>

    <div class="flex-none">
      <nav :class="'flex flex-wrap my-auto'">
        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/'">Home</router-link>

        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/login'"
          v-if="nameRoutesEnable.includes('login') && !userLogged">Login</router-link>

        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/cadastro'"
          v-if="nameRoutesEnable.includes('cadastro') && !userLogged">Cadastro</router-link>
        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/financeiro'"
          v-if="nameRoutesEnable.includes('financeiro')">Financeiro
        </router-link>

        <div class="btn-sm mx-1 btn btn-outline btn-secondary"
          @click="togleShowModalFixed({ nome: 'modalCalculadora', show: true })">Calculadora</div>
        <!--   <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/contasapagar'"
          v-if="nameRoutesEnable.includes('contasapagar')"
          >Contas a Pagar
        </router-link>
        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/usuarios'"
          v-if="nameRoutesEnable.includes('usuarios')"
          >Usuários
        </router-link> -->
        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/dashboard'"
          v-if="nameRoutesEnable.includes('dashboard')">Cotação
        </router-link>
        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/corretoras'"
          v-if="nameRoutesEnable.includes('corretoras')">Corretoras</router-link>
        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/diario'"
          v-if="nameRoutesEnable.includes('diario')">Diário</router-link>

        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/contabilidade'"
          v-if="nameRoutesEnable.includes('contabilidade')">Contabilidade</router-link>

        <div class="btn-sm mx-1 btn btn-primary" @click="Logout()" v-if="nameRoutesEnable.includes('contabilidade')">
          Sair
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import Calculadora from "../pages/Calculadora.vue";

import { useModal } from "../components/modals/use/useModal";
const { togleShowModalFixed } = useModal();

import { useAuth } from "../mods/auth/use/useAuth";
let { Logout, userLogged } = useAuth();
import { useAcl } from "../mods/auth/acl/use/useAcl";
let { nameRoutesEnable } = useAcl();
</script>
