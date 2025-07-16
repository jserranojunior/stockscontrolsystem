import {reactive} from "vue"

class StoreAuth {
  public store = reactive({
    token: {
      erro: "",
      token: "",
    },
  });

  
  getAuthToken() {
    return this.store.token.token;
  }
  getAuth() {
    return this.store.token;
  }

 
  setAuthToken(value: string) {
    this.store.token.token = value;
  }
  setAuthErro(value: string) {
    this.store.token.erro = value;
  }


}

export default new StoreAuth();
