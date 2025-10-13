import { store } from "./storeAportes";
import { httpGetAportes, httpAddAporte } from "./httpAportes";
export const useAportes = () => {
  async function getAportes() {
    await httpGetAportes().then((res: any) => {
      store.aportes = res.data;
    });
  }

  function showMessage(message: string) {
    // Implementar lógica para exibir mensagem de erro
    alert(message);
  }

  /*   async function converterCampoData(data: string) {
    let dataConvertida: any;
    if (!data) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dataConvertida = today.toISOString();
    } else {
      if (!data.includes("T")) {
        const dateWithZeroTime = new Date(data + "T00:00:00");
        dataConvertida = dateWithZeroTime.toISOString();
      }
    }
    return dataConvertida;
  }
 */
  async function adicionarAporte() {
    // Validação básica antes de enviar
    if (!store.novoaporte.valor) {
      showMessage("Preencha todos os campos obrigatórios");
      return false;
    }

    console.log(store.novoaporte);

    /*     store.novoaporte.data = converterCampoData(store.novoaporte.data);
     */
    try {
      const result = await httpAddAporte(store.novoaporte);

      if (result.status == 201) {
        // Sucesso
        showMessage(result.message || "Operação adicionada com sucesso!");

        // Limpar formulário

        store.novoaporte = {};
        return true;
      } else {
        // Erro
        showMessage(result.error || "Erro ao adicionar operação");
        console.log(result);
        return false;
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return false;
      }
    }
  }

  return {
    getAportes,
    adicionarAporte,
  };
};
