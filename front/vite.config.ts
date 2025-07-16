import vue from "@vitejs/plugin-vue";
import envCompatible from "vite-plugin-env-compatible";

export default ({ command }: any) => {
  if (command === "serve") {
    return {
      plugins: [vue(), envCompatible()],
      resolve: {
        alias: [{ find: "@", replacement: "/src" }],
      },
      server: {
        host: true, // aceita conexões externas
        port: 3000,
        hmr: {
          host: "scs.alvitre.com.br", // domínio para o HMR websocket
          port: 443, // porta do websocket (443 para HTTPS)
          protocol: "wss", // websocket seguro (HTTPS)
        },
      },
    };
  } else if (command === "testbuild") {
    return {
      plugins: [vue(), envCompatible()],
      resolve: {
        alias: [{ find: "@", replacement: "/src" }],
      },
      server: {
        host: "0.0.0.0",
        port: 5000,
        https: true,
        hmr: { host: "192.168.15.4:8081", port: 8081 },
      },
      build: {
        chunkSizeWarningLimit: 2000,
      },
    };
  }
};
