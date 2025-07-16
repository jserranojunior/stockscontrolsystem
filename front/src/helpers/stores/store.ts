import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useRegister } from "../../mods/register/composables/useRegister";
import { useUsers } from "../../mods/users/composables/useUsers";
import { useFinancial } from "../../mods/financeiro/composables/useFinancial";

export default function useStore() {
  let router = reactive(useRouter());
  let register = reactive(useRegister());
  let users = reactive(useUsers());
  let financeiro = reactive(useFinancial());

  return { register, router, users, financeiro };
}
