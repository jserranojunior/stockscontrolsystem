import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const commonConfig = {
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
};

export default ({ command }: { command: string }) => {
  if (command === "serve") {
    return {
      ...commonConfig,
      server: {
        host: "0.0.0.0",
        port: 8082,
        https: false,
        allowedHosts: ["devscs.alvitre.com.br"],
      },
    };
  } else if (command === "build") {
    return {
      ...commonConfig,
      server: {
        host: "0.0.0.0",
        port: 88,
        https: true,
        hmr: { host: "https://scs.alvitre.com.br", port: 443 },
      },
      build: {
        target: "esnext",
        chunkSizeWarningLimit: 2000,
      },
    };
  }
};
