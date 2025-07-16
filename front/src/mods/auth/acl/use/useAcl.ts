import { toRefs } from "vue";
import { store } from "./storeAcl";
import { httpAcl } from "./httpAcl";
import { store as route } from "../../../rotas/storeRoutes";

export const useAcl = () => {
  function getRouteName(idRota: number) {
    const match = route.routes.find((r) => r.meta.id === idRota);
    if (!match) {
      return;
    }

    if (!store.nameRoutesEnable.includes(match.name)) {
      store.nameRoutesEnable.push(match.name);
    } else {
      console.log("ℹ Rota já adicionada:", match.name);
    }
  }

  function checkIfExisteRoutes(rotaID: number) {
    if (store.rotasEnableServidor.includes(rotaID)) {
      return true;
    } else {
      return false;
    }
  }

  function joinAclPublic() {
    if (store.userAcl && store.userAcl[0]) {
      store.userAcl.unshift(store.publicRoutes[0]);
    } else {
      store.userAcl = store.publicRoutes;
    }
  }

  async function getUserAcl(FuncHttpAcl = httpAcl) {
    await FuncHttpAcl()
      .getUserAcl()
      .then((useHttpAcl: any) => {
        if (useHttpAcl && useHttpAcl.data) {
          store.userAcl = useHttpAcl.data;
        }
      });
  }

  function clearRoutesEnableWithUserAcls() {
    store.nameRoutesEnable = [];
    store.rotasEnableServidor = [];
    store.userAcl = [];
    generateRoutesEnableWithUserAcls();
  }

  async function generateRoutesEnableWithUserAcls() {
    await getUserAcl().then(async () => {
      joinAclPublic();

      store.userAcl.forEach((acl: any) => {
        acl.Routes.forEach((rota: any) => {
          if (!store.rotasEnableServidor.includes(rota)) {
            store.rotasEnableServidor.push(rota);
          }

          getRouteName(rota);
        });
      });
    });

    return true;
  }

  return {
    ...toRefs(store),
    checkIfExisteRoutes,
    generateRoutesEnableWithUserAcls,
    getUserAcl,
    joinAclPublic,
    clearRoutesEnableWithUserAcls,
  };
};
