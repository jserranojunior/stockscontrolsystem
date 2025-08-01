<template>
  <div
    class="text-neutral rounded-xl w-full z-10 px-2 flex flex-wrap justify-between my-1 items-center mx-2"
  >
    <div class="flex-1">
      <label for="my-drawer" class="btn btn-sm drawer-button cursor-pointer">
        <Icon icon="ic:sharp-menu" width="24" height="24"></Icon>
      </label>
      <slot name="title"></slot>
    </div>

    <div class="flex-none">
      <nav :class="'flex flex-wrap my-auto'">
        <router-link class="btn-sm mx-1 btn btn-outline btn-secondary" :to="'/'"
          >Home</router-link
        >

        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/login'"
          v-if="nameRoutesEnable.includes('login') && !userLogged"
          >Login</router-link
        >

        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/cadastro'"
          v-if="nameRoutesEnable.includes('cadastro') && !userLogged"
          >Cadastro</router-link
        >
        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/financeiro'"
          v-if="nameRoutesEnable.includes('financeiro')"
          >Financeiro
        </router-link>

        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/calculadora'"
          v-if="nameRoutesEnable.includes('calculadora')"
          >Calculadora</router-link
        >
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
        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/dashboard'"
          v-if="nameRoutesEnable.includes('dashboard')"
          >Cotação
        </router-link>
        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/corretoras'"
          v-if="nameRoutesEnable.includes('corretoras')"
          >Corretoras</router-link
        >
        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/diario'"
          v-if="nameRoutesEnable.includes('diario')"
          >Diário</router-link
        >

        <router-link
          class="btn-sm mx-1 btn btn-outline btn-secondary"
          :to="'/contabilidade'"
          v-if="nameRoutesEnable.includes('contabilidade')"
          >Contabilidade</router-link
        >
        <div
          class="btn-sm mx-1 btn btn-primary"
          @click="Logout()"
          v-if="nameRoutesEnable.includes('financeiro')"
        >
          Sair
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";

import { useAuth } from "../mods/auth/use/useAuth";
let { Logout, userLogged } = useAuth();
import { useAcl } from "../mods/auth/acl/use/useAcl";
let { nameRoutesEnable } = useAcl();
</script>
