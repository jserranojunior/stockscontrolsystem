import { reactive, toRefs, ref } from "vue";
import { useHttpRegister } from "./useHttpRegister";
import { store } from "./storeRegister";
const { register } = useHttpRegister();

export function useRegister() {
  function joinCodeAndProne() {
    store.fields.cellphone = store.phoneCode + store.fields.cellphone;
  }

  async function Register() {
    setStoreError("");
    joinCodeAndProne();
    if (checkFieldsIsValid() && checkSamePassword()) {
      return await register(store.fields).then((res: any) => {
        if (res && res.data) {
          return true;
        } else {
          if (
            res &&
            res.response &&
            res.response.data &&
            res.response.data.message
          ) {
            
            setStoreError(res.response.data.message);
          } else if (res && res.response && res.response.data) {
            setStoreError(
              "Erro ao fazer cadastro, contate o administrador do sistema"
            );
            console.error("Servidor offline");
            console.error(res.response.data);
          } else if (res && res.response) {
            setStoreError("Erro, contate o administrador do sistema");
            console.error("Servidor offline");
            console.error(res.response);
          } else if (res) {
            console.error(res);
          }
          return false;
        }
      });
    } else {
      return false;
    }
  }
  function setStoreError(erro: string) {
    store.erro = erro;
  }
  function checkFieldsIsValid() {
    if (
      store.fields &&
      store.fields.email > "" &&
      store.fields.password > "" &&
      store.fields.name > "" &&
      store.confirmPassword > ""
    ) {
      return true;
    } else {
      setStoreError("Campos Vazios");
      return false;
    }
  }
  function checkSamePassword() {
    if (store.confirmPassword == store.fields.password) {
      return true;
    } else {
      setStoreError("Senhas diferentes");
      return false;
    }
  }
  function setStateFields(dataFields: {
    email: string;
    password: string;
    name: string;
  }) {
    store.fields.name = dataFields.name;

    store.fields.email = dataFields.email;
    store.fields.password = dataFields.password;
  }

  return {
    ...toRefs(store),
    checkFieldsIsValid,
    setStateFields,
    setStoreError,
    Register,
    checkSamePassword,
    joinCodeAndProne,
  };
}
