import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import routes from "./mods/rotas/routes";
/* import Maska from "maska";
 */ import { Icon } from "@iconify/vue";
import { useAcl } from "./mods/auth/acl/use/useAcl";

let { generateRoutesEnableWithUserAcls } = useAcl();

async function start() {
  await generateRoutesEnableWithUserAcls().then(() => {
    createApp(App).use(routes).component("Icon", Icon).mount("#app");
  });
}

start().catch((error) => {
  console.error("Error during app initialization:", error);
});
