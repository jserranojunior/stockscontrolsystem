import { store } from "./storeToken";
import useHttpToken from "./useHttpToken";

const HttpToken = new useHttpToken();
export const useToken = () => {
  async function setToken(value: string) {
    localStorage.setItem("token", value);
    store.token = value;
    if (value) {
      store.erro = "";
      return true;
    } else {
      return false;
    }
  }

  async function getToken(dataLogin: { email: any; password: any }) {
    store.erro = "";
    if (dataLogin && dataLogin.email && dataLogin.password) {
      return await HttpToken.gettoken(dataLogin).then(async (response) => {
        if (response) {
          await setToken(response.data.token);
        }
      });
    }
  }
  return { setToken, getToken };
};
