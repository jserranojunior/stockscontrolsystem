import { store } from "./storeRoutes";
import { createRouter, createWebHistory } from "vue-router";
import { useAcl } from "../auth/acl/use/useAcl";

let { checkIfExisteRoutes } = useAcl();

const router = createRouter({
  history: createWebHistory(),
  routes: store.routes,
});

router.beforeEach((to, from) => {
  if (typeof to.meta.id == "number") {
    if (checkIfExisteRoutes(to.meta.id)) {
      return true;
    } else {
      router.push({ name: "/" });
      return false;
    }
  }
});

export default router;
