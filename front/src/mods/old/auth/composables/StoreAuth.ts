import { reactive } from "vue";

class StoreAuth {
  public store = reactive({
    ola: "ola de dentro do reactive",
    fields: {
      email: "",
      password: "",
    },
    auth: {
      erro: "",
      token: "",
    },
  });

  getOla() {
    return this.store.ola;
  }
  getAuthToken() {
    return this.store.auth.token;
  }
  getAuth() {
    return this.store.auth;
  }
  setOla(value: string) {
    this.store.ola = value;
  }
  setAuthToken(value: string) {
    this.store.auth.token = value;
  }
  setAuthErro(value: string) {
    this.store.auth.erro = value;
  }

  getFields() {
    return this.store.fields;
  }

  getFieldsEmail() {
    return this.store.fields.email;
  }

  getFieldsPassword() {
    return this.store.fields.password;
  }

  setFieldsEmail(value: string) {
    this.store.fields.email = value;
  }
  setFieldsPassword(value: string) {
    this.store.fields.password = value;
  }
}

export default new StoreAuth();
