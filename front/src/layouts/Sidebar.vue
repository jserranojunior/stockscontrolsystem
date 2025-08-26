<template>
  <!--   <div class="menu p-4 overflow-y-auto w-80 text-neutral-content border-r border-neutral bg-base-100">
    <router-link class="btn-sm mt-1 btn" :to="'/'">Home</router-link>
    <router-link class="btn-sm mt-1 btn" :to="'/login'"
      v-if="Auth.store.auth && !Auth.store.auth.token">Login</router-link>
    <router-link class="btn-sm mt-1 btn" :to="'/cadastro'"
      v-if="Auth.store.auth && !Auth.store.auth.token">Cadastro</router-link>
    <router-link class="btn-sm mt-1 btn" :to="'/financeiro'" v-if="Auth.store.auth && Auth.store.auth.token">Financeiro
    </router-link>
    <router-link class="btn-sm mt-1 btn" :to="'/contasapagar'" v-if="Auth.store.auth && Auth.store.auth.token">Contas a
      Pagar
    </router-link>
    <div class="btn-sm mt-1 btn btn-secondary" @click="logout" v-if="Auth.store.auth && Auth.store.auth.token">
      Sair
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { onBeforeMount } from "@vue/runtime-core";
// Update the import path below if the actual file name or path is different (e.g., 'auth.ts', 'auth.js', or 'auth/index.ts')
// Update the path below to the correct location of your auth composable
import { useAuth } from "../mods/auth/use/useAuth";
const Auth = useAuth();
import router from "../mods/rotas/routes";

function logout() {
  Auth.Logout().then(() => {
    router.push("/");
  });
}
</script>
