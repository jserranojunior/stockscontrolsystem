import StoreToken from "./StoreToken";
import { reactive } from "vue";

class Token {
  public store;

  constructor() {
    this.store = reactive(StoreToken.store);
  }

  setTokenEqualStorageState() {
    if (
      this.checkOnBrowser() &&
      this.checkLocalstorageToken() &&
      localStorage.getItem("token") !== StoreToken.getAuthToken()
    ) {
      this.setToken(String(localStorage.getItem("token")));
    } else {
      this.setToken("");
    }
  }
  checkOnBrowser() {
    if (typeof window !== "undefined") {
      return true;
    } else {
      return false;
    }
  }

  checkStateToken() {
    if (
      !StoreToken.getAuth() ||
      !StoreToken.getAuthToken() ||
      StoreToken.getAuthToken() == "" ||
      StoreToken.getAuthToken() == undefined ||
      StoreToken.getAuthToken() == "undefined" ||
      StoreToken.getAuthToken() == "null" ||
      StoreToken.getAuthToken() == null ||
      StoreToken.getAuthToken().length == 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  setStateToken(token: string) {
    this.store.token.token = token;
  }

  setLocalStorageToken(token: string) {
    if (this.checkOnBrowser()) {
      localStorage.setItem("token", token);
    }
  }
  checkTokenIsEmpty(token: string) {
    if (token !== "") {
      return true;
    } else {
      return false;
    }
  }
  checkLocalstorageToken() {
    if (this.checkOnBrowser()) {
      if (
        localStorage.getItem("token") != "null" ||
        localStorage.getItem("token") != "undefined" ||
        localStorage.getItem("token") != null ||
        localStorage.getItem("token") != undefined
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  setToken(token: string) {

      this.setLocalStorageToken(token);
      this.setStateToken(token);
      return true;

  }
}

export default new Token();
