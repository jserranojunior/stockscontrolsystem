import { reactive } from "vue";

export const store = reactive({
  fields: {
    name: "",
    email: "",
    password: "",
    cellphone: "",
  },
  phoneCode: "+55",
  confirmPassword: "",
  erro: "",
});
