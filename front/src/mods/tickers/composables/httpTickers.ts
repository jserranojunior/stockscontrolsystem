import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export function httpTickers() {
  async function getCorretoras() {
    const urlApi = "/corretoras";
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  async function getCorretorasComOperacoes() {
    const urlApi = "/corretorascomoperacoes";
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  return { getCorretoras, getCorretorasComOperacoes };
}
