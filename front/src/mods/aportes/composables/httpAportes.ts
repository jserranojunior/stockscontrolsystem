import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  status?: number;
}

export async function httpGetAportes() {
  const urlApi = "/aportes";
  return await ApiConnect.getWithoutToken(urlApi)
    .then((res: any) => {
      return res;
    })
    .catch((res: any) => {
      return res;
    });
}

export async function httpAddAporte(data: any) {
  const urlApi = "/aportes";
  return await ApiConnect.postWithoutToken(urlApi, data)
    .then((res: any) => {
      return res;
    })
    .catch((res: any) => {
      console.log(res.response.data);

      return res;
    });
}
