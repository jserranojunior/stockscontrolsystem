import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export function httpIA() {
  async function analiseativo(tickerSelecionado: string) {
    const urlApi = "/analiseativo/" + tickerSelecionado;
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  return { analiseativo };
}
