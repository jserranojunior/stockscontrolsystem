import axios, { AxiosResponse, AxiosInstance, AxiosStatic } from "axios";
export const useHttpResources = () => {
  async function get(url: string) {
    let dataToReturn = {
      ID: 1,
      CreatedAt: "2022-10-06T15:37:12Z",
      UpdatedAt: "2020-01-14T15:37:12Z",
      DeletedAt: null,
      nome: "Essencais",
      cor: "#3E6A91",
      tipo: "pagamento",
      ContasAPagar: [
        {
          ID: 92,
          CreatedAt: "2020-11-14T00:00:00Z",
          UpdatedAt: "2021-05-10T17:07:15.972Z",
          DeletedAt: null,
          user_id: 49,
          categorias_contas_a_pagar_id: 1,
          favorecido: "Telefone",
          inicio_data_pagamento: "2020-11-14",
          fim_data_pagamento: "",
          descricao: "",
          forma_pagamento: "Débito",
          tipo_conta: "Extra",
          parcelas: "",
          ValoresContasAPagar: {
            ID: 98,
            CreatedAt: "2021-02-03T05:29:19.491Z",
            UpdatedAt: "2021-02-03T05:29:19.491Z",
            DeletedAt: null,
            contas_a_pagar_id: 92,
            data_pagamento: "2021-02-03",
            valor: 95,
          },
          ContasPagas: {
            ID: 156,
            CreatedAt: "2021-02-15T13:30:10.838Z",
            UpdatedAt: "2021-02-15T13:30:10.838Z",
            DeletedAt: null,
            contas_a_pagar_id: 92,
            data_pagamento: "2021-02-15",
          },
        },
      ],
      Soma: 175,
    };

    return dataToReturn;
  }

  async function edit(url: string, id: number) {
    const urlApi = `${url}${id}`;
    const dataToReturn = {
      ID: 92,
      CreatedAt: "2020-11-14T00:00:00Z",
      UpdatedAt: "2021-05-10T17:07:15.972Z",
      DeletedAt: null,
      user_id: 49,
      categorias_contas_a_pagar_id: 1,
      favorecido: "Telefone",
      inicio_data_pagamento: "2020-11-14",
      fim_data_pagamento: "",
      descricao: "",
      forma_pagamento: "Débito",
      tipo_conta: "Extra",
      parcelas: "",
      ValoresContasAPagar: {
        ID: 98,
        CreatedAt: "2021-02-03T05:29:19.491Z",
        UpdatedAt: "2021-02-03T05:29:19.491Z",
        DeletedAt: null,
        contas_a_pagar_id: 92,
        data_pagamento: "2021-02-03",
        valor: 95,
      },
      ContasPagas: {
        ID: 156,
        CreatedAt: "2021-02-15T13:30:10.838Z",
        UpdatedAt: "2021-02-15T13:30:10.838Z",
        DeletedAt: null,
        contas_a_pagar_id: 92,
        data_pagamento: "2021-02-15",
      },
    };

    return dataToReturn;
  }
  async function store(url: string, data: any) {
    const urlApi = `/${url}/`;

    return data;
  }
  async function update(url: string, data: any) {
    const urlApi = `${url}`;
    return data;
  }
  async function delet(url: string, data: number) {
    const urlApi = `${url}${data}`;
    const dataToReturn = true;

    return dataToReturn;
  }

  return {
    store,
    update,
    delet,
    edit,
    get,
  };
};
