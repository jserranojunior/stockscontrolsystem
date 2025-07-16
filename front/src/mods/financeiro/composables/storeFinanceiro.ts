import { reactive } from "vue";
import { datePtBrToUs } from "../../../helpers/dates/helpersDates";

export const store = reactive({
  categoriaContas: {
    CategoriasContasAPagars: [],
    TotalCategories: 0,
    SomaFormaPagamento: {
      Cartão: 0,
      Dinheiro: 0,
      Débito: 0,
    },
  } as any,
  editarContaAPagar: {},
  Calendario: {
    selectedDate: datePtBrToUs(
      new Date().toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    ) as string,
  },
  ContaAPagar: {
    ID: -0,
    ValoresContasAPagar: { valor: 0, data_pagamento: "" },
    categorias_contas_a_pagar_id: 0,
    favorecido: "" as string,
    inicio_data_pagamento: new Date(),
    fim_data_pagamento: new Date(),
    forma_pagamento: "",
    tipo_conta: "",
    descricao: "",
  },
  editAddMode: { mode: "" },
  dataAtual: datePtBrToUs(
    new Date().toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  ),
  inicioDataPagamentoWithouFormated: "",
  fimDataPagamentoWithouFormated: "",
  err: "",
  mode: "",
});
