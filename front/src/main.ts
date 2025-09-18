import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import routes from "./mods/rotas/routes";
/* import Maska from "maska";
 */ import { Icon } from "@iconify/vue";
import { useAcl } from "./mods/auth/acl/use/useAcl";

import ElementPlus from "element-plus";

let { generateRoutesEnableWithUserAcls } = useAcl();

async function start() {
  await generateRoutesEnableWithUserAcls().then(() => {
    createApp(App)
      .use(routes)
      .use(ElementPlus)
      .component("Icon", Icon)

      .mount("#app");
  });
}

start().catch((error) => {
  console.error("Error during app initialization:", error);
});
