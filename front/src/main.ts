import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import routes from "./mods/rotas/routes";
/* import Maska from "maska";
 */ import { Icon } from "@iconify/vue";
import { useAcl } from "./mods/auth/acl/use/useAcl";
import VueTheMask from "vue-the-mask";
import { VMoney } from "v-money";

let { generateRoutesEnableWithUserAcls } = useAcl();

async function start() {
  await generateRoutesEnableWithUserAcls().then(() => {
    createApp(App)
      .use(routes)
      .directive("money", VMoney)
      .component("Icon", Icon)
      .use(VueTheMask)
      .mount("#app");
  });
}

start().catch((error) => {
  console.error("Error during app initialization:", error);
});
