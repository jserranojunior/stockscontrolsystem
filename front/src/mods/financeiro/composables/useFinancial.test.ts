import { store } from "./storeFinanceiro";
import { useHttpResources } from "./mockUseHttpResources";
import { datePtBrToUs } from "../../../helpers/dates/helpersDates";

import Financial from "./Financial"

import { it, expect } from "vitest";

it("set store setContasAPagar", () => {
  const data = {
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
  Financial.setContasAPagar(data);
  expect(Financial.store.ContaAPagar).toStrictEqual(data);
});

it("check store contains categoriaContas", () => {
  expect(Financial.store.categoriaContas).toBeTruthy();
});

it("check store contains categoriaContas TotalCategories", () => {
  expect(Financial.store.categoriaContas.TotalCategories == 0).toBeTruthy();
});

it("check store contains categoriaContas", () => {
  expect(Financial.store.categoriaContas).toBeTruthy();
});

it("check store contains categoriaContas", () => {
  expect(Financial.store.categoriaContas).toBeTruthy();
});
it("set setCategoriaTest", () => {
  Financial.setCategoriaTest();
  expect(Financial.store.ContaAPagar.favorecido == "Jorge").toBeTruthy();
});

it("check store contains setCategoriaTest", () => {
  Financial.setCategoriaTest();
  expect(Financial.store.categoriaContas.TotalCategories == 1516).toBeTruthy();
});

it("check get mock getCategoriaContas return date 2022-10-06", async () => {
  return await Financial.getCategoriaContas("2022-10-06", useHttpResources)
    .then((res) => {
      const data = {
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
      expect(res).toStrictEqual(data);
    });
});

it("check edit mock getContaAPagar", async () => {
  return await Financial.GetEditBillsToPay(92, useHttpResources)
    .then((res) => {
      const data = {
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
      expect(res).toStrictEqual(data);
    });
});

it("check formaterBillsToPay", () => {
  const data = {
    ID: 92,
    CreatedAt: "2020-11-14T00:00:00Z",
    UpdatedAt: "2021-05-10T17:07:15.972Z",
    DeletedAt: null,
    user_id: 49,
    categorias_contas_a_pagar_id: "1",
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
      data_pagamento: "",
      valor: "95",
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
  const fomatingData = Financial.formaterBillsToPay(data);

  const dataFormated = {
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
      data_pagamento: datePtBrToUs(
        new Date().toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      ),
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
  expect(fomatingData).toStrictEqual(dataFormated);
});

it("set setDataCalendario", () => {
  const date = "2022-10-08";
  Financial.setDataCalendario(date);
  expect(Financial.store.Calendario.selectedDate).toStrictEqual(date);
});

it("set storeBillsToPay", async () => {
  const dataBillsToPay = {
    ID: 92,
    CreatedAt: "2020-11-14T00:00:00Z",
    UpdatedAt: "2021-05-10T17:07:15.972Z",
    DeletedAt: null,
    user_id: 49,
    categorias_contas_a_pagar_id: "1",
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
      data_pagamento: "",
      valor: "95",
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
      data_pagamento: Financial.store.Calendario.selectedDate,
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
  return await Financial.storeBillsToPay(dataBillsToPay, useHttpResources)
    .then((res: any) => {
      expect(res).toStrictEqual(dataToReturn);
    });
});

it("set deleteBillPayment", async () => {
  const confirmDelete = await Financial.deleteBillPayment(1);
  expect(confirmDelete).toBe(true);
});

it("set deleteBillPayment", () => {
  Financial.setEditAddMode("edit");
  expect(Financial.store.editAddMode.mode).toBe("edit");
});

it("set store updateBillsToPay", async () => {
  const data = {
    ID: 92,
    CreatedAt: "2020-11-14T00:00:00Z",
    UpdatedAt: "2021-05-10T17:07:15.972Z",
    DeletedAt: null,
    user_id: 49,
    categorias_contas_a_pagar_id: 1,
    favorecido: "Telefone",
    inicio_data_pagamento: new Date(),
    fim_data_pagamento: new Date(),
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
  return await Financial.updateBillsToPay(data, useHttpResources)
    .then((res) => {
      expect(res).toStrictEqual(data);
    });
});

it("set setDataCalendario", async () => {
  const actualDate = datePtBrToUs(
    new Date().toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );
  const data = {
    ID: -0,
    ValoresContasAPagar: { valor: 0, data_pagamento: "" },
    categorias_contas_a_pagar_id: 2,
    favorecido: "",
    inicio_data_pagamento: actualDate,
    fim_data_pagamento: actualDate,
    forma_pagamento: "Cartão",
    tipo_conta: "Extra",
  };
  return await Financial.setValuesFormBillsToPay().then(() => {
    expect(Financial.store.ContaAPagar).toStrictEqual(data);
  });
});

it("set makeBillPayment", async () => {
  const data = {
    contas_a_pagar_id: 15,
    data_pagamento: datePtBrToUs(
      new Date().toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    ) as string,
  };
  return await Financial.makeBillPayment(15, data.data_pagamento, useHttpResources)
    .then((res: any) => {
      expect(res).toStrictEqual(data);
    });
});

/* it("check get mock getSetCategoriasContas", async () => {
  return await Financial.getSetCategoriasContas().then(() => {
    const data = {
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
    expect(Financial.store.categoriaContas).toStrictEqual(data);
  });
}); */

/*     ,
getSetCategoriasContas

    setDataCalendario,
    makeBillPayment,
    deleteBillPayment,
   
    
    storeBillsToPay,
    addBillsToPay,
    updateBillsToPay,
    setEditAddMode,
    checkExistValueCategorie,
   */
