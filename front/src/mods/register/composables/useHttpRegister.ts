import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export function useHttpRegister() {
  async function register(data: Record<string, unknown>) {
    const urlApi = "/user";
    return await ApiConnect.postWithoutToken(urlApi, data)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  return { register };
}
