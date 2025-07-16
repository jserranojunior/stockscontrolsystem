import axios, { AxiosResponse, AxiosInstance, AxiosStatic } from "axios";

export interface ClassUseApiConnect {
  get: (endpoint: string) => Promise<void | AxiosResponse>;
  post: (
    endpoint: string,
    body: Record<string, unknown>
  ) => Promise<void | AxiosResponse>;
  put: (
    endpoint: string,
    body: Record<string, unknown>
  ) => Promise<void | AxiosResponse>;
  patch: (
    endpoint: string,
    body: Record<string, unknown>
  ) => Promise<void | AxiosResponse>;
  delet: (endpoint: string) => Promise<void | AxiosResponse>;
  postimage: (
    endpoint: string,
    body: Record<string, unknown>
  ) => Promise<void | AxiosResponse>;
  getWithoutToken: (
    endpoint: string,
    body: Record<string, unknown>
  ) => Promise<void | AxiosResponse>;
  postWithoutToken: (
    endpoint: string,
    body: Record<string, unknown>
  ) => Promise<void | AxiosResponse>;
  putWithoutToken: (
    endpoint: string,
    body: Record<string, unknown>
  ) => Promise<void | AxiosResponse>;
}

class apiConnect {
  public token: any;
  public axiosImage: AxiosInstance;
  public axiosWithoutToken: AxiosInstance;
  public axiosInstance: AxiosInstance | undefined;
  public backApiUrl: string | undefined;
  public axios: AxiosStatic;

  constructor() {
    this.checkTokenStorage();
    this.backApiUrl = import.meta.env.VITE_BUILD_URL;
    this.axios = axios;
    this.axiosImage = this.axios.create({
      baseURL: this.backApiUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    this.axiosWithoutToken = this.axios.create({
      baseURL: this.backApiUrl,
    });
  }

  async checkTokenStorage() {
    if (this.checkOnBrowser()) {
      this.token = localStorage.getItem("token");
    } else {
      this.token = "";
    }
  }
  checkOnBrowser() {
    if (typeof window !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
  async get(endpoint: string): Promise<void | AxiosResponse> {
    this.checkTokenStorage();
    if (this.token) {
      this.axiosInstance = this.axios.create({
        baseURL: this.backApiUrl,
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      });
      return await this.axiosInstance
        .get(endpoint)
        .then((res: any) => {
          return res.data;
        })
        .catch((res: any) => {
          console.error("erro", res);
          return res;
        });
    } else {
      console.error("SEM TOKEN");
    }
  }

  async post(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<void | AxiosResponse> {
    this.checkTokenStorage();
    if (this.token) {
      this.axiosInstance = this.axios.create({
        baseURL: this.backApiUrl,
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      });
      return this.axiosInstance.post(endpoint, body);
    } else {
      console.error("SEM TOKEN");
    }
  }

  async put(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<void | AxiosResponse> {
    this.checkTokenStorage();
    this.axiosInstance = this.axios.create({
      baseURL: this.backApiUrl,
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/json",
      },
    });
    return this.axiosInstance.put(endpoint, body);
  }
  async patch(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<void | AxiosResponse> {
    this.checkTokenStorage();
    this.axiosInstance = this.axios.create({
      baseURL: this.backApiUrl,
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/json",
      },
    });
    return this.axiosInstance.patch(endpoint, body);
  }

  async delet(endpoint: string): Promise<void | AxiosResponse> {
    this.checkTokenStorage();
    this.axiosInstance = this.axios.create({
      baseURL: this.backApiUrl,
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/json",
      },
    });
    return this.axiosInstance.delete(endpoint);
  }

  async postimage(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<void | AxiosResponse> {
    this.checkTokenStorage();
    this.axiosInstance = this.axios.create({
      baseURL: this.backApiUrl,
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/json",
      },
    });
    return this.axiosImage.post(endpoint, body);
  }

  async getWithoutToken(endpoint: string): Promise<void | AxiosResponse> {
    return this.axiosWithoutToken.get(endpoint);
  }

  async postWithoutToken(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<void | AxiosResponse> {
    return this.axiosWithoutToken.post(endpoint, body);
  }

  async putWithoutToken(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<void | AxiosResponse> {
    return this.axiosWithoutToken.put(endpoint, body);
  }
}
export default apiConnect;
