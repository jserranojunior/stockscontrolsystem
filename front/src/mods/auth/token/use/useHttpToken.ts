import ClassUseApiConnect from "../../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

class useHttpToken {
  async gettoken(data: any) {
    const urlApi = "/login";
    return ApiConnect.post(urlApi, data);
  }
}

export default useHttpToken;
