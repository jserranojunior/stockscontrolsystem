import { store } from "./storeIA";
import { toRefs } from "vue";
import { httpIA } from "./httpIA";

export const useIA = () => {

      async function GetAnaliseAtivo() {
        await httpIA().analiseativo(store.tickerSelecionado)
          .then((res: any) => {
            store.analiseAtivo = res.data;
          });
      }

      return { ...toRefs(store),  GetAnaliseAtivo };
}