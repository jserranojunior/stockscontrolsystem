import ClassUseApiConnect from "./useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export const useHttpResources = () => {
  async function get(url: string) {
    return await ApiConnect.get(url)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }else{
          return response
        }
      })
      .catch((err) => {
        console.error(err);
        console.error(err.response);
      });
  }

  async function edit(url: string) {
    return await ApiConnect.get(url)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
        console.error(err.response);
      });
  }
  async function store(url: string, data: any) {
    return await ApiConnect.post(url, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
        console.error(err.response);
      });
  }
  async function update(url: string, data: any) {
    const urlApi = `${url}`;
    return await ApiConnect.put(urlApi, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
        console.error(err.response);
      });
  }
  async function delet(url: string) {
    const urlApi = `${url}`;
    return await ApiConnect.delet(urlApi)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
        console.error(err.response);
      });
  }
  return {
    store,
    update,
    delet,
    edit,
    get,
  };
};
