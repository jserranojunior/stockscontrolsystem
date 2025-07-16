import useHttpAuth from "../routes/useHttpAuth";

import { dateFormatUs, dateFormatPtbr } from "alvitre-obelisk";
import { Ref, toRefs } from "vue";
import router from "../../rotas/routes";
import { store } from "../store/storeAuth";

import { useAcl } from "../acl/use/useAcl";
let {
  getUserAcl,
  generateRoutesEnableWithUserAcls,
  nameRoutesEnable,
  clearRoutesEnableWithUserAcls,
} = useAcl();

import { useToast } from "../../../components/toast/use/useToast";
let { addNotification } = useToast();

const HttpAuth = new useHttpAuth();
export const useAuth = () => {
  async function Login() {
    cleanStore();
    if (checkInputs()) {
      return await HttpAuth.login(store.loginInputs)
        .then(async (res: any) => {
          await logado(res.data.token);
        })
        .catch((err) => {
          console.error("err", err);
          erroLogin(err);
        });
    }
  }

  function checkInputs() {
    if (
      store.loginInputs &&
      store.loginInputs.email &&
      store.loginInputs.password
    ) {
      return true;
    } else {
      store.auth.erro = "Campos Vazios";
      addNotification({
        type: "warning",
        title: "Campos de login vazio.",
        body: "Por favor, tente novamente!",
      });
      setToken("");
      store.btnLogin = true;
      return false;
    }
  }

  function cleanStore() {
    store.auth.erro = "";
    store.auth.data = "";
    store.btnLogin = false;
  }

  function erroLogin(err: string) {
    addNotification({
      type: "warning",
      title: "Usuário ou senha incorretos.",
      body: "Por favor, tente novamente!",
    });
    store.btnLogin = true;
    store.auth.erro = err;
    store.logged = false;
    store.admin = false;
  }
  async function logado(res: string) {
    await setToken(res).then(async () => {
      store.logged = true;
      await getUserID().then(async () => {
        await getUserAcl().then(async () => {
          await generateRoutesEnableWithUserAcls().then(() => {
            setRoutesEnableAuth(nameRoutesEnable);
          });
        });
        store.btnLogin = true;
      });
    });
  }

  function clearMessages() {
    store.auth.erro = "";
    store.auth.data = "";
  }

  function loginWithEnterBTN() {
    document.addEventListener("keyup", async function (evt) {
      if (evt.keyCode === 13) {
        await Login();
      }
    });
  }

  async function isLogged() {
    setTokenEqualStorageState();
    const checked = checkStateToken();
    return checked;
  }
  function setTokenEqualStorageState() {
    if (
      checkOnBrowser() &&
      checkLocalstorageToken() &&
      localStorage.getItem("token") !== store.auth.token
    ) {
      setToken(String(localStorage.getItem("token")));
    }
  }
  function checkStateToken() {
    if (
      !store.auth ||
      !store.auth.token ||
      store.auth.token == "" ||
      store.auth.token == undefined ||
      store.auth.token == "undefined" ||
      store.auth.token == "null" ||
      store.auth.token == null ||
      store.auth.token.length == 0
    ) {
      console.error("token retornado falso", store.auth.token);

      return false;
    } else {
      return true;
    }
  }
  function checkOnBrowser() {
    if (typeof window !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
  function checkLocalstorageToken() {
    if (checkOnBrowser()) {
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

  async function setToken(value: string) {
    localStorage.setItem("token", value);
    store.auth.token = value;
    if (value) {
      store.auth.erro = "";
      return true;
    } else {
      return false;
    }
  }
  async function Logout() {
    await setToken("").then(async () => {
      localStorage.setItem("token", "");

      store.userLogged = null;
      store.admin = false;
      store.logged = false;
      clearRoutesEnableWithUserAcls();
      /*     Trocar para rotas publicas
       */ router.push({ name: "/" });
    });
  }
  async function getUserID() {
    if (localStorage.getItem("token")) {
      return await HttpAuth.getUser()
        .then(async (res) => {
          store.userLogged = res;
          return res;
        })
        .catch((err) => {
          console.error("abaixo erro ao pegar ID usuario", err);
        });
    }
  }
  // ACl
  async function addRoutesNameEnableInAuth(routes: any) {
    store.routesEnabled = [];
    if (routes) {
      let allRotas = routes;
      allRotas.forEach((item: { name: any }) =>
        store.routesEnabled.push(item.name)
      );
    }
  }
  function setRoutesEnableAuth(rotesName: any) {
    store.routesEnabled = rotesName;
  }
  async function setArrayRoutes(routes: { getRoutes: () => any }) {
    console.log("setArrayRoutes", routes);
    store.routesEnabled = [];
    if (routes) {
      let allRotas = routes.getRoutes();
      allRotas.forEach((item: { name: any }) =>
        store.routesEnabled.push(item.name)
      );
    }
  }

  async function UpdateUser(data: any) {
    data.image = `${data.id}.jpg`;
    return await HttpAuth.updateuser(data)
      .then(() => {
        return true;
      })
      .catch(function (error) {
        console.error(error);
        return error;
      });
  }

  return {
    ...toRefs(store),

    UpdateUser,
    Logout,
    Login,
    isLogged,

    clearMessages,
    getUserID,
    setArrayRoutes,
    addRoutesNameEnableInAuth,
    setRoutesEnableAuth,
    loginWithEnterBTN,
  };
};
