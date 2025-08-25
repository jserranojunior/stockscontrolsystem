import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

async function getOperacoesSemanaMes() {
  const urlApi = "/operacoessemanames";
  return await ApiConnect.getWithoutToken(urlApi)
    .then((res: any) => {
      return res;
    })
    .catch((res: any) => {
      return res;
    });
}

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

  async function getCorretorasComOperacoesPerformance(data: string) {
    const urlApi = "/corretorascomoperacoesperformance/" + data;
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  async function getTickersCorretoraID(corretoraID: number) {
    const urlApi = "/tickers/" + corretoraID;
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  async function getOperacoesID(ID: number) {
    const urlApi = "/operacoes/" + ID;
    return await ApiConnect.getWithoutToken(urlApi)
      .then((res: any) => {
        console.log(res);
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  async function updateOperacoes(data: any) {
    const urlApi = "/operacoes";
    return await ApiConnect.putWithoutToken(urlApi, data)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  interface OperacaoData {
    tickerId: number;
    tipoOperacao: string;
    data: string;
    quantidade: number;
    valorTotal: number;
    valorUnidade: number;
    precoMedioCompra?: number;
    saldoTickers?: number;
    carteira?: number;
  }

  interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
    message?: string;
    status?: number;
  }

  async function addOperacao(data: OperacaoData): Promise<ApiResponse> {
    const urlApi = "/operacoes";

    try {
      const response = await ApiConnect.postWithoutToken(
        urlApi,
        data as unknown as Record<string, unknown>
      );

      if (
        response &&
        typeof response === "object" &&
        "status" in response &&
        response.status >= 200 &&
        response.status < 300
      ) {
        return {
          success: true,
          data: response.data,
          message: "Operação adicionada com sucesso",
        };
      } else if (
        response &&
        typeof response === "object" &&
        "status" in response
      ) {
        return {
          success: false,
          error: response.data?.error || "Erro ao adicionar operação",
          status: response.status,
        };
      } else {
        return {
          success: false,
          error: "Resposta inválida do servidor",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "Erro de conexão",
        status: error.response?.status,
      };
    }
  }
  return {
    updateOperacoes,
    getCorretoras,
    getCorretorasComOperacoes,
    getCorretorasComOperacoesPerformance,
    getTickersCorretoraID,
    addOperacao,
    getOperacoesSemanaMes,
    getOperacoesID,
  };
}
