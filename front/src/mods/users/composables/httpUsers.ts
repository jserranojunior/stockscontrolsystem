import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export const httpUsers = () => {
  async function getAll() {
    const urlApi = "/admin/users";
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        return res.data;
      })
      .catch((res: any) => {
        return res;
      });
  }
  return { getAll };
};
