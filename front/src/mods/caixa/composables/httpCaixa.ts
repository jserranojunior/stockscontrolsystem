import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export function httpCaixa() {
  async function updateCaixa(data: any) {
    const urlApi = "/caixas/" + data.ID;
    return await ApiConnect.putWithoutToken(urlApi, data)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  async function getCaixas() {
    const urlApi = "/caixas";
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  return {
    updateCaixa,
    getCaixas,
  };
}
