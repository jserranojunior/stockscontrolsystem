import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export const useHttpFinanceiro = () => {
  /*   async function get(dataSelecionada: string) {
    const urlApi = `/financial/viewcategories/${dataSelecionada}`;
    return await ApiConnect.get(urlApi)
      .then((response) => {
        if (response && response.data && response.data.data) {
          return response.data.data;
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
        console.log(err.response);
      });
  } */
  /*   async function edit(id: number, dataSelecionada: string) {
    const urlApi = `/financial/editbills/${id}/${dataSelecionada}`;
    return await ApiConnect.get(urlApi)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  } */

  /*   async function storeBillsToPay(data: Record<string, unknown>) {
    const urlApi = `/financial/billstopay`;
    return await ApiConnect.post(urlApi, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  } */

  /*   async function update(data: Record<string, any>) {
    const urlApi = `/financial/billstopay/${data.ID}/${data.ValoresContasAPagar.data_pagamento}`;
    return await ApiConnect.put(urlApi, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  } */

  /*   async function storePaidAccount(data: Record<string, unknown>) {
    const urlApi = `/financial/paidbills`;
    return await ApiConnect.post(urlApi, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  } */

  /*   async function deletePaidAccount(data: number) {
    const urlApi = `/financial/paidbills/${data}`;
    return await ApiConnect.delet(urlApi)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  } */
  return {
    /*     deletePaidAccount,
     */
    /* storePaidAccount */
    /* update, */
    /*     storeBillsToPay,
    edit,
    get, */
  };
};
