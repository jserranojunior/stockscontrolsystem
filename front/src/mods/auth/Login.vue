<template>
  <div>
    <div class="context">
      <div class="flex items-center justify-center my-4">
        <div class="px-auto my-auto">
          <div class="card w-96 shadow-xl mt-12">
            <div class="card-body bg-base-100">
              <h2 class="card-title">Login</h2>
              <!--               <span v-if="Auth.store.auth">
                <div
                  v-if="Auth.store.auth.erro"
                  class="my-1 block text-sm text-gray-300 text-center bg-yellow-800 border border-yellow-900 h-8 items-center p-2 rounded-lg"
                  role="alert"
                >
                  {{ Auth.store.auth.erro }}
                </div>
                <div
                  v-if="Auth.store.auth.token"
                  class="my-1 block text-sm text-gray-300 text-center bg-green-800 border border-green-900 h-8 items-center p-2 rounded-sm"
                  role="alert"
                >
                  Logado com sucesso!
                </div>
              </span> -->

              <form class="form-control">
                <label class="block">
                  <input
                    id="email"
                    v-model="loginInputs.email"
                    type="email"
                    class="input input-sm w-full max-w-xs input-bordered"
                    placeholder="Email"
                  />
                </label>
                <label class="block mt-2">
                  <input
                    id="password"
                    v-model="loginInputs.password"
                    type="password"
                    class="input input-sm w-full max-w-xs input-bordered"
                    placeholder="Senha"
                    autocomplete="on"
                  />
                </label>
              </form>
              <div class="mt-2 border-t"></div>
              <div class="flex justify-between items-center mt-4">
                <div class="w-1/2">
                  <label class>
                    <span class="text-sm">Esqueci a senha</span>
                  </label>
                </div>
                <div class="w-1/2">
                  <button
                    class="w-full py-2 px-4 rounded-md btn btn-sm btn-primary"
                    @click="Login()"
                  >
                    <span class="px-2">LOGAR</span>
                    <Icon icon="ri:login-circle-line" />
                  </button>
                </div>
              </div>
            </div>
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
