import { toRefs } from "vue";
import { store } from "./storeCaixa";
import { httpCaixa } from "./httpCaixa";

export const useCaixa = () => {
  async function atualizarCaixa(data: any) {
    return await httpCaixa()
      .updateCaixa(data)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        console.error(res);
        return res;
      });
  }

  async function carregarCaixa() {
    return await httpCaixa()
      .getCaixas()
      .then((res: any) => {
        // se quiser já salvar no store:
        store.caixa = res.data;
        return res;
      })
      .catch((res: any) => {
        console.error(res);
        return res;
      });
  }

  return {
    atualizarCaixa,
    carregarCaixa,
    ...toRefs(store),
  };
};
