import { toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
import StoreFinancial from "./StoreFinancial";

import { useHttpResources } from "../../../helpers/http/useHttpResources";
import { dateUStoJsFull } from "alvitre-obelisk/src/convertDates/js/dateFormatJs";
import { dateUsToPtBr } from "../../../helpers/dates/helpersDates";
import { dateFormatUs } from "alvitre-obelisk";

class Financial {
  public store;
  constructor() {
    this.store = reactive(StoreFinancial.store);
  }

  async GetBillsMonth(id: number, FuncHttpFinanceiro: any = useHttpResources) {
    let useHttpFinanceiro = FuncHttpFinanceiro();
    if (this.store.Calendario.selectedDate) {
      const url = `/financial/billsmonth/${id}/${this.store.Calendario.selectedDate}`;
      return await useHttpFinanceiro.get(url).then((res: any) => {
        this.store.BillsToPay = res;
      });
    }
  }

  async GetEditBillsToPay(
    id: number,
    FuncHttpFinanceiro: any = useHttpResources
  ) {
    let useHttpFinanceiro = FuncHttpFinanceiro();
    if (this.store.Calendario.selectedDate) {
      const url = `/financial/editbills/${id}/${this.store.Calendario.selectedDate}`;

      return await useHttpFinanceiro.edit(url).then((res: any) => {
        this.store.ContaAPagar = res;
      });
    }
  }

  setContasAPagar(res: any) {
    if (res) {
      this.store.ContaAPagar = res;
    }
  }

  async getCategoriaContas(
    selectedDate: string,
    FuncHttpFinanceiro: any = useHttpResources
  ) {
    const url = `/financial/viewcategories/${selectedDate}`;
    return await FuncHttpFinanceiro()
      .get(url)
      .then((res: any) => {
        console.log(res);
        return res;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  setCategoriaTest() {
    this.store.categoriaContas = {
      CategoriasContasAPagars: [
        {
          ID: 1,
          CreatedAt: "2020-01-14T15:37:12Z",
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
            {
              ID: 103,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "2021-10-11T12:15:30.808Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 1,
              favorecido: "Luz",
              inicio_data_pagamento: "2020-11-14",
              fim_data_pagamento: "",
              descricao: "",
              forma_pagamento: "Dinheiro",
              tipo_conta: "Fixa",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 40,
                CreatedAt: "2020-11-14T00:00:00Z",
                UpdatedAt: "0001-01-01T00:00:00Z",
                DeletedAt: null,
                contas_a_pagar_id: 103,
                data_pagamento: "2020-12-30",
                valor: 80,
              },
              ContasPagas: {
                ID: 155,
                CreatedAt: "2021-02-15T13:28:00.039Z",
                UpdatedAt: "2021-02-15T13:28:00.039Z",
                DeletedAt: null,
                contas_a_pagar_id: 103,
                data_pagamento: "2021-02-15",
              },
            },
          ],
          Soma: 175,
        },
        {
          ID: 2,
          CreatedAt: "2020-01-14T15:56:23Z",
          UpdatedAt: "2020-01-14T15:56:23Z",
          DeletedAt: null,
          nome: "Compras",
          cor: "#49325B",
          tipo: "pagamento",
          ContasAPagar: [
            {
              ID: 91,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "2021-02-26T15:53:51.477Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 2,
              favorecido: "Teste 2",
              inicio_data_pagamento: "2020-11-14",
              fim_data_pagamento: "2021-02-30",
              descricao: "TA ROLANDO A BIND",
              forma_pagamento: "Dinheiro",
              tipo_conta: "Fixa",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 131,
                CreatedAt: "2021-02-26T15:53:44.566Z",
                UpdatedAt: "2021-02-26T15:53:51.473Z",
                DeletedAt: null,
                contas_a_pagar_id: 91,
                data_pagamento: "2021-02-26",
                valor: 115,
              },
              ContasPagas: {
                ID: 201,
                CreatedAt: "2021-03-01T14:37:19.744Z",
                UpdatedAt: "2021-03-01T14:37:19.744Z",
                DeletedAt: null,
                contas_a_pagar_id: 91,
                data_pagamento: "2021-02-11",
              },
            },
            {
              ID: 139,
              CreatedAt: "2021-02-15T13:44:06.848Z",
              UpdatedAt: "2021-02-15T13:44:06.848Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 2,
              favorecido: "Ali Express",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 102,
                CreatedAt: "2021-02-15T13:44:06.849Z",
                UpdatedAt: "2021-02-15T13:44:06.849Z",
                DeletedAt: null,
                contas_a_pagar_id: 139,
                data_pagamento: "2021-02-15",
                valor: 97,
              },
              ContasPagas: {
                ID: 177,
                CreatedAt: "2021-02-22T13:50:05.475Z",
                UpdatedAt: "2021-02-22T13:50:05.475Z",
                DeletedAt: null,
                contas_a_pagar_id: 139,
                data_pagamento: "2021-02-22",
              },
            },
            {
              ID: 144,
              CreatedAt: "2021-02-15T13:51:46.775Z",
              UpdatedAt: "2021-02-15T13:51:46.775Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 2,
              favorecido: "Lojinha de 1 real",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 107,
                CreatedAt: "2021-02-15T13:51:46.776Z",
                UpdatedAt: "2021-02-15T13:51:46.776Z",
                DeletedAt: null,
                contas_a_pagar_id: 144,
                data_pagamento: "2021-02-15",
                valor: 8,
              },
              ContasPagas: {
                ID: 159,
                CreatedAt: "2021-02-15T13:58:22.624Z",
                UpdatedAt: "2021-02-15T13:58:22.624Z",
                DeletedAt: null,
                contas_a_pagar_id: 144,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 145,
              CreatedAt: "2021-02-15T13:52:24.085Z",
              UpdatedAt: "2021-02-15T13:52:24.085Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 2,
              favorecido: "Lojinha de 1 real",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 108,
                CreatedAt: "2021-02-15T13:52:24.086Z",
                UpdatedAt: "2021-02-15T13:52:24.086Z",
                DeletedAt: null,
                contas_a_pagar_id: 145,
                data_pagamento: "2021-02-15",
                valor: 7,
              },
              ContasPagas: {
                ID: 160,
                CreatedAt: "2021-02-15T13:58:23.316Z",
                UpdatedAt: "2021-02-15T13:58:23.316Z",
                DeletedAt: null,
                contas_a_pagar_id: 145,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 146,
              CreatedAt: "2021-02-15T13:52:39.734Z",
              UpdatedAt: "2021-02-15T13:52:39.734Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 2,
              favorecido: "Lojinha de 1 real",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 109,
                CreatedAt: "2021-02-15T13:52:39.734Z",
                UpdatedAt: "2021-02-15T13:52:39.734Z",
                DeletedAt: null,
                contas_a_pagar_id: 146,
                data_pagamento: "2021-02-15",
                valor: 8,
              },
              ContasPagas: {
                ID: 161,
                CreatedAt: "2021-02-15T13:58:23.836Z",
                UpdatedAt: "2021-02-15T13:58:23.836Z",
                DeletedAt: null,
                contas_a_pagar_id: 146,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 150,
              CreatedAt: "2021-02-15T13:53:53.298Z",
              UpdatedAt: "2021-02-15T13:53:53.298Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 2,
              favorecido: "Lojinha de 1 real",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 113,
                CreatedAt: "2021-02-15T13:53:53.299Z",
                UpdatedAt: "2021-02-15T13:53:53.299Z",
                DeletedAt: null,
                contas_a_pagar_id: 150,
                data_pagamento: "2021-02-15",
                valor: 8,
              },
              ContasPagas: {
                ID: 162,
                CreatedAt: "2021-02-15T13:58:24.471Z",
                UpdatedAt: "2021-02-15T13:58:24.471Z",
                DeletedAt: null,
                contas_a_pagar_id: 150,
                data_pagamento: "2021-02-15",
              },
            },
          ],
          Soma: 243,
        },
        {
          ID: 3,
          CreatedAt: "2020-01-29T13:55:49Z",
          UpdatedAt: "2020-01-29T13:55:49Z",
          DeletedAt: null,
          nome: "Urgencias",
          cor: "#b21212",
          tipo: "pagamento",
          ContasAPagar: [
            {
              ID: 138,
              CreatedAt: "2021-02-15T13:43:35.593Z",
              UpdatedAt: "2021-02-15T13:43:35.593Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 3,
              favorecido: "Recarga Vivo",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 101,
                CreatedAt: "2021-02-15T13:43:35.593Z",
                UpdatedAt: "2021-02-15T13:43:35.593Z",
                DeletedAt: null,
                contas_a_pagar_id: 138,
                data_pagamento: "2021-02-15",
                valor: 10,
              },
              ContasPagas: {
                ID: 200,
                CreatedAt: "2021-02-26T16:11:22.637Z",
                UpdatedAt: "2021-02-26T16:11:22.637Z",
                DeletedAt: null,
                contas_a_pagar_id: 138,
                data_pagamento: "2021-02-26",
              },
            },
            {
              ID: 140,
              CreatedAt: "2021-02-15T13:44:58.278Z",
              UpdatedAt: "2021-02-15T13:44:58.278Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 3,
              favorecido: "Recarga de celular",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 103,
                CreatedAt: "2021-02-15T13:44:58.279Z",
                UpdatedAt: "2021-02-15T13:44:58.279Z",
                DeletedAt: null,
                contas_a_pagar_id: 140,
                data_pagamento: "2021-02-15",
                valor: 10,
              },
              ContasPagas: {
                ID: 179,
                CreatedAt: "2021-02-22T13:50:07.747Z",
                UpdatedAt: "2021-02-22T13:50:07.747Z",
                DeletedAt: null,
                contas_a_pagar_id: 140,
                data_pagamento: "2021-02-22",
              },
            },
            {
              ID: 141,
              CreatedAt: "2021-02-15T13:45:30.247Z",
              UpdatedAt: "2021-02-15T13:45:30.247Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 3,
              favorecido: "Recarga de celular",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 104,
                CreatedAt: "2021-02-15T13:45:30.248Z",
                UpdatedAt: "2021-02-15T13:45:30.248Z",
                DeletedAt: null,
                contas_a_pagar_id: 141,
                data_pagamento: "2021-02-15",
                valor: 10,
              },
              ContasPagas: {
                ID: 184,
                CreatedAt: "2021-02-22T13:50:15.658Z",
                UpdatedAt: "2021-02-22T13:50:15.658Z",
                DeletedAt: null,
                contas_a_pagar_id: 141,
                data_pagamento: "2021-02-22",
              },
            },
            {
              ID: 149,
              CreatedAt: "2021-02-15T13:53:37.682Z",
              UpdatedAt: "2021-02-15T13:53:37.682Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 3,
              favorecido: "Adega Riacho",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 112,
                CreatedAt: "2021-02-15T13:53:37.682Z",
                UpdatedAt: "2021-02-15T13:53:37.682Z",
                DeletedAt: null,
                contas_a_pagar_id: 149,
                data_pagamento: "2021-02-15",
                valor: 42,
              },
              ContasPagas: {
                ID: 174,
                CreatedAt: "2021-02-15T13:58:40.219Z",
                UpdatedAt: "2021-02-15T13:58:40.219Z",
                DeletedAt: null,
                contas_a_pagar_id: 149,
                data_pagamento: "2021-02-15",
              },
            },
          ],
          Soma: 72,
        },
        {
          ID: 4,
          CreatedAt: "2020-01-29T13:56:18Z",
          UpdatedAt: "2020-01-29T13:56:18Z",
          DeletedAt: null,
          nome: "Lazer",
          cor: "#5D2646",
          tipo: "pagamento",
          ContasAPagar: [
            {
              ID: 93,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "2021-09-13T13:46:39.595Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 4,
              favorecido: "Spotify",
              inicio_data_pagamento: "2020-11-14",
              fim_data_pagamento: "2021-07-13",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Fixa",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 13,
                CreatedAt: "2020-11-14T00:00:00Z",
                UpdatedAt: "0001-01-01T00:00:00Z",
                DeletedAt: null,
                contas_a_pagar_id: 93,
                data_pagamento: "2020-11-14",
                valor: 17,
              },
              ContasPagas: {
                ID: 163,
                CreatedAt: "2021-02-15T13:58:25.959Z",
                UpdatedAt: "2021-02-15T13:58:25.959Z",
                DeletedAt: null,
                contas_a_pagar_id: 93,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 122,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "0001-01-01T00:00:00Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 4,
              favorecido: "Steam",
              inicio_data_pagamento: "2021-01-04",
              fim_data_pagamento: "2021-02-04",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Parcelada",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 50,
                CreatedAt: "2020-11-14T00:00:00Z",
                UpdatedAt: "0001-01-01T00:00:00Z",
                DeletedAt: null,
                contas_a_pagar_id: 122,
                data_pagamento: "2021-01-04",
                valor: 24,
              },
              ContasPagas: {
                ID: 180,
                CreatedAt: "2021-02-22T13:50:09.409Z",
                UpdatedAt: "2021-02-22T13:50:09.409Z",
                DeletedAt: null,
                contas_a_pagar_id: 122,
                data_pagamento: "2021-02-22",
              },
            },
            {
              ID: 137,
              CreatedAt: "2021-02-15T13:42:59.729Z",
              UpdatedAt: "2021-02-15T13:42:59.729Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 4,
              favorecido: "Steam",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 100,
                CreatedAt: "2021-02-15T13:42:59.73Z",
                UpdatedAt: "2021-02-15T13:42:59.73Z",
                DeletedAt: null,
                contas_a_pagar_id: 137,
                data_pagamento: "2021-02-15",
                valor: 7,
              },
              ContasPagas: {
                ID: 181,
                CreatedAt: "2021-02-22T13:50:09.943Z",
                UpdatedAt: "2021-02-22T13:50:09.943Z",
                DeletedAt: null,
                contas_a_pagar_id: 137,
                data_pagamento: "2021-02-22",
              },
            },
          ],
          Soma: 48,
        },
        {
          ID: 5,
          CreatedAt: "2020-01-29T13:56:32Z",
          UpdatedAt: "2020-01-29T13:56:32Z",
          DeletedAt: null,
          nome: "Transporte",
          cor: "#8B9197",
          tipo: "pagamento",
          ContasAPagar: [
            {
              ID: 95,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "2021-07-20T22:11:40.701Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 5,
              favorecido: "Seguro Carro",
              inicio_data_pagamento: "2020-11-14",
              fim_data_pagamento: "2021-05-14",
              descricao: "",
              forma_pagamento: "Débito Automatico",
              tipo_conta: "Fixa",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 127,
                CreatedAt: "2021-02-17T21:46:32.262Z",
                UpdatedAt: "2021-02-17T21:46:32.262Z",
                DeletedAt: null,
                contas_a_pagar_id: 95,
                data_pagamento: "2021-02-17",
                valor: 120,
              },
              ContasPagas: {
                ID: 158,
                CreatedAt: "2021-02-15T13:40:15.034Z",
                UpdatedAt: "2021-02-15T13:40:15.034Z",
                DeletedAt: null,
                contas_a_pagar_id: 95,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 152,
              CreatedAt: "2021-02-15T13:54:50.406Z",
              UpdatedAt: "2021-02-15T13:54:50.406Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 5,
              favorecido: "Universal Peças",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 115,
                CreatedAt: "2021-02-15T13:54:50.407Z",
                UpdatedAt: "2021-02-15T13:54:50.407Z",
                DeletedAt: null,
                contas_a_pagar_id: 152,
                data_pagamento: "2021-02-15",
                valor: 20,
              },
              ContasPagas: {
                ID: 173,
                CreatedAt: "2021-02-15T13:58:37.172Z",
                UpdatedAt: "2021-02-15T13:58:37.172Z",
                DeletedAt: null,
                contas_a_pagar_id: 152,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 153,
              CreatedAt: "2021-02-15T13:55:06.311Z",
              UpdatedAt: "2021-02-15T13:55:06.311Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 5,
              favorecido: "Universal Peças",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 116,
                CreatedAt: "2021-02-15T13:55:06.312Z",
                UpdatedAt: "2021-02-15T13:55:06.312Z",
                DeletedAt: null,
                contas_a_pagar_id: 153,
                data_pagamento: "2021-02-15",
                valor: 150,
              },
              ContasPagas: {
                ID: 172,
                CreatedAt: "2021-02-15T13:58:36.713Z",
                UpdatedAt: "2021-02-15T13:58:36.713Z",
                DeletedAt: null,
                contas_a_pagar_id: 153,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 154,
              CreatedAt: "2021-02-15T13:55:36.176Z",
              UpdatedAt: "2021-02-15T13:55:36.176Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 5,
              favorecido: "Ostencell",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 117,
                CreatedAt: "2021-02-15T13:55:36.177Z",
                UpdatedAt: "2021-02-15T13:55:36.177Z",
                DeletedAt: null,
                contas_a_pagar_id: 154,
                data_pagamento: "2021-02-15",
                valor: 40,
              },
              ContasPagas: {
                ID: 171,
                CreatedAt: "2021-02-15T13:58:35.854Z",
                UpdatedAt: "2021-02-15T13:58:35.854Z",
                DeletedAt: null,
                contas_a_pagar_id: 154,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 156,
              CreatedAt: "2021-02-15T13:56:19.641Z",
              UpdatedAt: "2021-02-15T13:56:19.641Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 5,
              favorecido: "Uber",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 119,
                CreatedAt: "2021-02-15T13:56:19.642Z",
                UpdatedAt: "2021-02-15T13:56:19.642Z",
                DeletedAt: null,
                contas_a_pagar_id: 156,
                data_pagamento: "2021-02-15",
                valor: 13,
              },
              ContasPagas: {
                ID: 169,
                CreatedAt: "2021-02-15T13:58:34.323Z",
                UpdatedAt: "2021-02-15T13:58:34.323Z",
                DeletedAt: null,
                contas_a_pagar_id: 156,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 157,
              CreatedAt: "2021-02-15T13:56:39.301Z",
              UpdatedAt: "2021-02-15T13:56:39.301Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 5,
              favorecido: "Uber",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 120,
                CreatedAt: "2021-02-15T13:56:39.302Z",
                UpdatedAt: "2021-02-15T13:56:39.302Z",
                DeletedAt: null,
                contas_a_pagar_id: 157,
                data_pagamento: "2021-02-15",
                valor: 44,
              },
              ContasPagas: {
                ID: 170,
                CreatedAt: "2021-02-15T13:58:34.905Z",
                UpdatedAt: "2021-02-15T13:58:34.905Z",
                DeletedAt: null,
                contas_a_pagar_id: 157,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 161,
              CreatedAt: "2021-02-15T14:36:07.457Z",
              UpdatedAt: "2021-02-15T14:36:07.457Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 5,
              favorecido: "Licenciamento",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 124,
                CreatedAt: "2021-02-15T14:36:07.457Z",
                UpdatedAt: "2021-02-15T14:36:07.457Z",
                DeletedAt: null,
                contas_a_pagar_id: 161,
                data_pagamento: "2021-02-15",
                valor: 97,
              },
              ContasPagas: {
                ID: 176,
                CreatedAt: "2021-02-15T14:36:10.026Z",
                UpdatedAt: "2021-02-15T14:36:10.026Z",
                DeletedAt: null,
                contas_a_pagar_id: 161,
                data_pagamento: "2021-02-15",
              },
            },
          ],
          Soma: 484,
        },
        {
          ID: 6,
          CreatedAt: "2020-01-29T13:56:50Z",
          UpdatedAt: "2020-01-29T13:56:50Z",
          DeletedAt: null,
          nome: "Alimentação",
          cor: "#F76489",
          tipo: "pagamento",
          ContasAPagar: [
            {
              ID: 142,
              CreatedAt: "2021-02-15T13:45:59.915Z",
              UpdatedAt: "2021-02-15T13:45:59.915Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 6,
              favorecido: "ifood",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 105,
                CreatedAt: "2021-02-15T13:45:59.916Z",
                UpdatedAt: "2021-02-15T13:45:59.916Z",
                DeletedAt: null,
                contas_a_pagar_id: 142,
                data_pagamento: "2021-02-15",
                valor: 45,
              },
              ContasPagas: {
                ID: 183,
                CreatedAt: "2021-02-22T13:50:13.12Z",
                UpdatedAt: "2021-02-22T13:50:13.12Z",
                DeletedAt: null,
                contas_a_pagar_id: 142,
                data_pagamento: "2021-02-22",
              },
            },
            {
              ID: 143,
              CreatedAt: "2021-02-15T13:51:28.903Z",
              UpdatedAt: "2021-02-15T13:51:28.903Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 6,
              favorecido: "Mercado Dia",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 106,
                CreatedAt: "2021-02-15T13:51:28.904Z",
                UpdatedAt: "2021-02-15T13:51:28.904Z",
                DeletedAt: null,
                contas_a_pagar_id: 143,
                data_pagamento: "2021-02-15",
                valor: 16,
              },
              ContasPagas: {
                ID: 164,
                CreatedAt: "2021-02-15T13:58:30.547Z",
                UpdatedAt: "2021-02-15T13:58:30.547Z",
                DeletedAt: null,
                contas_a_pagar_id: 143,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 147,
              CreatedAt: "2021-02-15T13:52:55.318Z",
              UpdatedAt: "2021-02-15T13:52:55.318Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 6,
              favorecido: "Mercado Extra",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 110,
                CreatedAt: "2021-02-15T13:52:55.318Z",
                UpdatedAt: "2021-02-15T13:52:55.318Z",
                DeletedAt: null,
                contas_a_pagar_id: 147,
                data_pagamento: "2021-02-15",
                valor: 28,
              },
              ContasPagas: {
                ID: 165,
                CreatedAt: "2021-02-15T13:58:31.063Z",
                UpdatedAt: "2021-02-15T13:58:31.063Z",
                DeletedAt: null,
                contas_a_pagar_id: 147,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 148,
              CreatedAt: "2021-02-15T13:53:20.126Z",
              UpdatedAt: "2021-02-15T13:53:20.126Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 6,
              favorecido: "Sacolão",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 111,
                CreatedAt: "2021-02-15T13:53:20.127Z",
                UpdatedAt: "2021-02-15T13:53:20.127Z",
                DeletedAt: null,
                contas_a_pagar_id: 148,
                data_pagamento: "2021-02-15",
                valor: 32,
              },
              ContasPagas: {
                ID: 166,
                CreatedAt: "2021-02-15T13:58:31.584Z",
                UpdatedAt: "2021-02-15T13:58:31.584Z",
                DeletedAt: null,
                contas_a_pagar_id: 148,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 151,
              CreatedAt: "2021-02-15T13:54:04.817Z",
              UpdatedAt: "2021-02-15T13:54:04.817Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 6,
              favorecido: "Mercado Dia",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 114,
                CreatedAt: "2021-02-15T13:54:04.818Z",
                UpdatedAt: "2021-02-15T13:54:04.818Z",
                DeletedAt: null,
                contas_a_pagar_id: 151,
                data_pagamento: "2021-02-15",
                valor: 16,
              },
              ContasPagas: {
                ID: 167,
                CreatedAt: "2021-02-15T13:58:32.31Z",
                UpdatedAt: "2021-02-15T13:58:32.31Z",
                DeletedAt: null,
                contas_a_pagar_id: 151,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 155,
              CreatedAt: "2021-02-15T13:55:52.309Z",
              UpdatedAt: "2021-02-15T13:55:52.309Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 6,
              favorecido: "Assai",
              inicio_data_pagamento: "2021-02-15",
              fim_data_pagamento: "2021-02-15",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Extra",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 118,
                CreatedAt: "2021-02-15T13:55:52.31Z",
                UpdatedAt: "2021-02-15T13:55:52.31Z",
                DeletedAt: null,
                contas_a_pagar_id: 155,
                data_pagamento: "2021-02-15",
                valor: 74,
              },
              ContasPagas: {
                ID: 168,
                CreatedAt: "2021-02-15T13:58:32.915Z",
                UpdatedAt: "2021-02-15T13:58:32.915Z",
                DeletedAt: null,
                contas_a_pagar_id: 155,
                data_pagamento: "2021-02-15",
              },
            },
          ],
          Soma: 211,
        },
        {
          ID: 7,
          CreatedAt: "2020-01-29T13:57:12Z",
          UpdatedAt: "2020-01-29T13:57:12Z",
          DeletedAt: null,
          nome: "Estudos",
          cor: "#ff8507",
          tipo: "pagamento",
          ContasAPagar: [],
          Soma: 0,
        },
        {
          ID: 8,
          CreatedAt: "2020-01-29T13:57:29Z",
          UpdatedAt: "2020-01-29T13:57:29Z",
          DeletedAt: null,
          nome: "Avulsos",
          cor: "#84BE25",
          tipo: "pagamento",
          ContasAPagar: [
            {
              ID: 107,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "2021-02-15T13:41:38.267Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 8,
              favorecido: "Ponto Frio - Carla",
              inicio_data_pagamento: "2020-12-30",
              fim_data_pagamento: "2021-04-30",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Parcelada",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 99,
                CreatedAt: "2021-02-15T13:41:38.263Z",
                UpdatedAt: "2021-02-15T13:41:38.263Z",
                DeletedAt: null,
                contas_a_pagar_id: 107,
                data_pagamento: "2021-02-15",
                valor: 219,
              },
              ContasPagas: {
                ID: 182,
                CreatedAt: "2021-02-22T13:50:11.463Z",
                UpdatedAt: "2021-02-22T13:50:11.463Z",
                DeletedAt: null,
                contas_a_pagar_id: 107,
                data_pagamento: "2021-02-22",
              },
            },
          ],
          Soma: 219,
        },
        {
          ID: 9,
          CreatedAt: "2020-01-29T13:57:29Z",
          UpdatedAt: "2020-01-29T13:57:29Z",
          DeletedAt: null,
          nome: "Empresa",
          cor: "#c26fbf",
          tipo: "pagamento",
          ContasAPagar: [
            {
              ID: 96,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "2021-10-11T12:15:45.702Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 9,
              favorecido: "DAS MEI",
              inicio_data_pagamento: "2020-11-14",
              fim_data_pagamento: "",
              descricao: "",
              forma_pagamento: "Débito Automatico",
              tipo_conta: "Fixa",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 32,
                CreatedAt: "2020-11-14T00:00:00Z",
                UpdatedAt: "0001-01-01T00:00:00Z",
                DeletedAt: null,
                contas_a_pagar_id: 96,
                data_pagamento: "2020-11-30",
                valor: 57,
              },
              ContasPagas: {
                ID: 157,
                CreatedAt: "2021-02-15T13:37:15.585Z",
                UpdatedAt: "2021-02-15T13:37:15.585Z",
                DeletedAt: null,
                contas_a_pagar_id: 96,
                data_pagamento: "2021-02-15",
              },
            },
            {
              ID: 98,
              CreatedAt: "2020-11-14T00:00:00Z",
              UpdatedAt: "0001-01-01T00:00:00Z",
              DeletedAt: null,
              user_id: 49,
              categorias_contas_a_pagar_id: 9,
              favorecido: "Google Play Storage",
              inicio_data_pagamento: "2020-11-14",
              fim_data_pagamento: "",
              descricao: "",
              forma_pagamento: "Cartão",
              tipo_conta: "Fixa",
              parcelas: "",
              ValoresContasAPagar: {
                ID: 18,
                CreatedAt: "2020-11-14T00:00:00Z",
                UpdatedAt: "0001-01-01T00:00:00Z",
                DeletedAt: null,
                contas_a_pagar_id: 98,
                data_pagamento: "2020-11-14",
                valor: 7,
              },
              ContasPagas: {
                ID: 175,
                CreatedAt: "2021-02-15T13:58:43.525Z",
                UpdatedAt: "2021-02-15T13:58:43.525Z",
                DeletedAt: null,
                contas_a_pagar_id: 98,
                data_pagamento: "2021-02-15",
              },
            },
          ],
          Soma: 64,
        },
      ],
      TotalCategories: 1516,
      SomaFormaPagamento: {
        Cartão: 1049,
        Dinheiro: 195,
        Débito: 95,
        "Débito Automatico": 177,
      },
    };
    this.store.ContaAPagar = {
      ID: 1,
      ValoresContasAPagar: { valor: 27, data_pagamento: "10/06/2022" },
      categorias_contas_a_pagar_id: 1,
      favorecido: "Jorge",
      inicio_data_pagamento: new Date(2023, 2, 1),
      fim_data_pagamento: new Date(2023, 2, 1),
      forma_pagamento: "",
      tipo_conta: "",
      descricao: "",
    };
  }

  formaterBillsToPay(bills: any) {
    if (typeof bills.categorias_contas_a_pagar_id == "string") {
      bills.categorias_contas_a_pagar_id = parseInt(
        bills.categorias_contas_a_pagar_id
      );
    }

    if (typeof bills.ValoresContasAPagar.valor == "string") {
      bills.ValoresContasAPagar.valor = parseFloat(
        bills.ValoresContasAPagar.valor
      );
    }
    if (this.store.Calendario.selectedDate) {
      bills.ValoresContasAPagar.data_pagamento =
        this.store.Calendario.selectedDate;
    }
    if (this.store.inicioDataPagamentoWithouFormated) {
      this.store.ContaAPagar.inicio_data_pagamento = dateUStoJsFull(
        this.store.inicioDataPagamentoWithouFormated
      );
    }
    if (this.store.fimDataPagamentoWithouFormated) {
      this.store.ContaAPagar.fim_data_pagamento = dateUStoJsFull(
        this.store.fimDataPagamentoWithouFormated
      );
    }

    return bills;
  }

  setDataCalendario(data: string) {
    if (data) {
      this.store.Calendario.selectedDate = data;
    }
  }

  async storeBillsToPay(
    data: any = this.store.ContaAPagar,
    FuncHttpFinanceiro: any = useHttpResources
  ) {
    let useHttpFinanceiro = FuncHttpFinanceiro();
    const url = `/financial/billstopay`;

    if (
      !this.store.ContaAPagar.favorecido ||
      !this.store.ContaAPagar.inicio_data_pagamento
    ) {
      this.store.err = "Campos Vazios";
    } else {
      const billsFormated = this.formaterBillsToPay(data);

      return await useHttpFinanceiro
        .store(url, billsFormated)
        .then((res: any) => {
          return res;
        });
    }
  }

  async deleteBillPayment(
    id: number,
    FuncHttpFinanceiro: any = useHttpResources
  ) {
    let useHttpFinanceiro = FuncHttpFinanceiro();

    const url = "/financial/paidbills/" + id;
    return await useHttpFinanceiro.delet(url).then((res: any) => {
      return true;
    });
  }

  async setEditAddMode(mode: string) {
    this.store.editAddMode.mode = mode;
    return mode;
  }

  async updateBillsToPay(
    contasAPagar = this.store.ContaAPagar,
    FuncHttpFinanceiro: any = useHttpResources
  ) {
    const urlApi = `/financial/billstopay/${contasAPagar.ID}/${this.store.Calendario.selectedDate}`;

    let useHttpFinanceiro = FuncHttpFinanceiro();

    if (!contasAPagar.favorecido || !contasAPagar.inicio_data_pagamento) {
      this.store.err = "Campos Vazios";
    } else {
      const billsFormated = this.formaterBillsToPay(contasAPagar);
      console.info(billsFormated.fim_data_pagamento, "FIM");
      console.info(billsFormated.inicio_data_pagamento, "INICIO");

      return await useHttpFinanceiro
        .update(urlApi, billsFormated)
        .then((res: any) => {
          return res;
        });
    }
  }

  async setValuesFormBillsToPay() {
    let setDate = new Date();
    if (this.store.dataAtual) {
      setDate = dateUStoJsFull(this.store.dataAtual);
    }
    this.store.ContaAPagar = {
      ID: -0,
      ValoresContasAPagar: { valor: 0, data_pagamento: "" },
      categorias_contas_a_pagar_id: 2,
      favorecido: "",
      inicio_data_pagamento: setDate,
      fim_data_pagamento: setDate,
      forma_pagamento: "Cartão",
      tipo_conta: "Extra",
      descricao: "",
    };
    this.store.inicioDataPagamentoWithouFormated = dateFormatUs(setDate);
  }

  async makeBillPayment(
    id: number,
    data_pagamento: any = this.store.Calendario.selectedDate,
    FuncHttpFinanceiro: any = useHttpResources
  ) {
    let useHttpFinanceiro = FuncHttpFinanceiro();
    const data = {
      contas_a_pagar_id: id,
      data_pagamento,
    };
    const url = `/financial/paidbills`;
    return await useHttpFinanceiro.store(url, data).then((res: any) => {
      return res;
    });
  }

  setExistValueCategorie(categories: any) {
    this.store.categoriaContas = categories;
  }

  async getSetCategoriasContas() {
    await this.getCategoriaContas(this.store.Calendario.selectedDate).then(
      (res) => {
        this.setExistValueCategorie(res);
      }
    );
  }

  async getSetContasAPagar(id: number) {
    await this.GetEditBillsToPay(id).then((res) => {
      if (res.data[0].inicio_data_pagamento) {
        this.store.inicioDataPagamentoWithouFormated = dateFormatUs(
          res.data[0].inicio_data_pagamento
        );
      }
      if (res.data[0].fim_data_pagamento) {
        this.store.fimDataPagamentoWithouFormated = dateFormatUs(
          res.data[0].fim_data_pagamento
        );
      }
      this.setContasAPagar(res.data[0]);
    });
  }

  setMode(mode: string) {
    this.store.mode = mode;
  }

  localStore = {
    countCategorie: 1,
  };
}

export default new Financial();
