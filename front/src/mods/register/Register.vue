<template>
  <div>
    <div class="context">
      <div class="flex items-center justify-center my-4">
        <div class="px-auto my-auto">
          <div class="card w-96 shadow-xl mt-12">
            <div class="card-body bg-base-300">
              <h2 class="card-title">Cadastro</h2>
              <span v-if="register && register.fields">
                <div
                  v-if="register.erro"
                  class="my-1 block text-sm text-gray-300 text-center bg-yellow-800 border border-yellow-900 h-8 items-center p-2 rounded-lg"
                  role="alert"
                >
                  {{ register.erro }}
                </div>
              </span>

              <form class="form-control">
                <label class="block">
                  <input
                    id="name"
                    v-model="register.fields.name"
                    type="text"
                    class="input input-sm w-full max-w-xs input-bordered"
                    placeholder="Nome"
                  />
                </label>
                <label class="block mt-2">
                  <div class="flex">
                    <div class="dropdown w-auto max-w-xs">
                      <label tabindex="0" class="btn btn-sm">{{
                        register.phoneCode
                      }}</label>
                      <ul
                        tabindex="0"
                        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li @click="register.phoneCode = '+55'">
                          <a>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/33px-Flag_of_Brazil.svg.png"
                            />
                            +55
                          </a>
                        </li>
                        <li @click="register.phoneCode = '+591'">
                          <a>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/33px-Flag_of_Bolivia.svg.png"
                            />
                            +591</a
                          >
                        </li>
                        <li @click="register.phoneCode = '+51'">
                          <a>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Peru.svg/33px-Flag_of_Peru.svg.png"
                            />
                            +51
                          </a> 
                        </li>
                      </ul>
                    </div>
                    <div class="w-full max-w-xs pl-2">
                      <input
                        id="cellphone"
                        v-model="register.fields.cellphone"
                        type="text"
                        class="input input-sm w-full max-w-xs input-bordered"
                        placeholder="Celular"
                        v-maska="'(##) #####-####'"
                      />
                    </div>
                  </div>
                </label>

                <label class="block mt-2">
                  <input
                    id="email"
                    v-model="register.fields.email"
                    type="email"
                    class="input input-sm w-full max-w-xs input-bordered"
                    placeholder="Email"
                  />
                </label>
                <label class="block mt-2">
                  <input
                    id="password"
                    v-model="register.fields.password"
                    type="password"
                    class="input input-sm w-full max-w-xs input-bordered"
                    placeholder="Senha"
                    autocomplete="on"
                  />
                </label>
                <label class="block mt-2">
                  <input
                    id="confirmpassword"
                    v-model="register.confirmPassword"
                    type="password"
                    class="input input-sm w-full max-w-xs input-bordered"
                    placeholder="Confirmar Senha"
                    autocomplete="on"
                  />
                </label>
              </form>
              <div class="mt-2 border-t"></div>
              <div class="flex justify-between items-center mt-4">
                <div class="w-1/2"></div>
                <div class="w-1/2">
                  <button
                    class="w-full py-2 px-4 rounded-md btn btn-sm"
                    @click="cadastrar()"
                  >
                    Cadastrar
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
<script setup lang="ts">
import useStore from "../../helpers/stores/store";
import { onMounted } from "vue";
import phoneMask from '../../helpers/mask/phoneMask';

let { register, router, auth } = useStore();

function redirectPageTo(url: string) {
  router.push({ path: url });
}
function cadastrar() {
  register.Register().then(async (res: boolean) => {
    if (res) {
      await logar();
    }
  });
}
async function logar() {
  auth.fields.email = register.fields.email;
  auth.fields.password = register.fields.password;
  await auth.Login().then((res: boolean) => {
    if (res) {
      redirectPageTo("/financeiro");
    }
  });
}
onMounted(() => {
  document.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      cadastrar();
    }
  });
});
</script>
