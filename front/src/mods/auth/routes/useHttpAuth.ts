import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

class useHttpAuth {
  async login(data: { email: string; password: string }) {
    const urlApi = "/login";
    console.log("make login");
    return await ApiConnect.postWithoutToken(urlApi, data)
      .then((response: any) => {
        console.log("response", response.data.token);

        return response;
      })
      .catch((err) => {
        console.log("Erro ao fazer login");
        console.log(err);
        return err;
      });
  }

  async register(data: any) {
    const urlApi = "/register";
    return ApiConnect.post(urlApi, data);
  }

  async updateuser(data: { id: any }) {
    const urlApi = `users/${data.id}`;
    return ApiConnect.put(urlApi, data);
  }
  async getUser() {
    const urlApi = "/user";
    return ApiConnect.get(urlApi);
  }
}

export default useHttpAuth;
