<template>
  <div class="flex flex-wrap">
    <div class="w-full flex items-center justify-items-end mt-1">
      <span>
        <Icon
          icon="carbon:user-avatar"
          class="p-1 rounded-full text-blue-700"
          width="35"
        />
      </span>
      <input
        type="email"
        v-model="loginInputs.email"
        id="emaillogin"
        placeholder="Email"
        class="input input-sm input-primary mx-1 w-full"
      />
    </div>
    <div class="w-full flex items-center justify-items-end mt-1">
      <span>
        <Icon
          icon="teenyicons:lock-circle-outline"
          class="p-1 rounded-full text-blue-700"
          width="32"
        />
      </span>
      <input
        type="password"
        v-model="loginInputs.password"
        id="senhalogin"
        placeholder="Senha"
        autocomplete="on"
        class="input input-sm input-primary mx-1 w-full"
      />
    </div>
    <div class="w-full mt-1">
      <div class="flex justify-between">
        <div class="w-1/2 text-left text-lg">
          <router-link
            :to="{ name: 'emailresetarsenha' }"
            class="hover:text-blue-600"
          >
            <p>Esqueceu a senha?</p>
          </router-link>
        </div>

        <div class="w-1/2 ml-auto text-right">
          <button
            class="btn btn-primary text-white text-base"
            v-show="btnLogin"
            @click="Login()"
          >
            Acessar
          </button>
          <div v-show="!btnLogin">
            <span class="loading w-8 loading-spinner"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useAuth } from "./use/useAuth";
let { loginInputs, Login, btnLogin, loginWithEnterBTN } = useAuth();

onMounted(() => {
  loginWithEnterBTN();
});
</script>
