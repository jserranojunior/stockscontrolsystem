import { reactive } from "vue";

export const store = reactive({
  corretoras: [] as any,

  operacoes: [
    {
      data: "2024-03-25",
      tick: "TSLA34",
      qtdCompra: 400,
      qtdVenda: null,
      valorCompra: 26.5,
      valorVenda: null,
    },
    {
      data: "2024-06-06",
      tick: "TSLA34",
      qtdCompra: 350,
      qtdVenda: null,
      valorCompra: 29.12,
      valorVenda: null,
    },
    {
      data: "2024-06-17",
      tick: "TSLA34",
      qtdCompra: 400,
      qtdVenda: null,
      valorCompra: 31.65,
      valorVenda: null,
    },
    {
      data: "2024-07-12",
      tick: "TSLA34",
      qtdCompra: null,
      qtdVenda: 400,
      valorCompra: null,
      valorVenda: 31.26,
    },
    {
      data: "2024-07-12",
      tick: "TSLA34",
      qtdCompra: null,
      qtdVenda: 750,
      valorCompra: null,
      valorVenda: 32.89,
    },
  ] as any,
  tipoOperacao: "compra",
  novaOperacao: {
    data: new Date().toISOString().split("T")[0],
    tickerId: null as any,
    quantidade: null as any,
    valorTotal: null as any,
    precoMedioCompra: null as any,
    tipoOperacao: "C",

    valorUnidade: null as any,
    saldoTickers: null as any,
    carteira: null as any,
  },

  ativosParaCalcular: {
    ASML: {
      nome: "ASML Holding NV",
      PrecoAtual: 721.46,

      operacoes: [
        {
          tipoOperacao: "C",
          data: "2025-07-29",
          quantidade: 2.0,
          valorTotal: 1451.35,
          valorUnidade: 725.68,
          precoMedioCompra: 725.68,
          saldoTickers: 2.0,
          carteira: 1451.35,
        },
      ],
    },
    PLTR: {
      nome: "Palantir Technologies Inc.",
      PrecoAtual: 158.19,
      operacoes: [
        {
          tipoOperacao: "C",
          data: "2025-02-18",
          quantidade: 10.0,
          valorTotal: 1210.0,
          valorUnidade: 121.0,
          precoMedioCompra: 121.0,
          saldoTickers: 10.0,
          carteira: 1210.0,
        },
        {
          tipoOperacao: "C",
          data: "2025-02-20",
          quantidade: 5.0,
          valorTotal: 524.38,
          valorUnidade: 104.88,
          precoMedioCompra: 115.63,
          saldoTickers: 15.0,
          carteira: 1734.38,
        },
        {
          tipoOperacao: "C",
          data: "2025-05-07",
          quantidade: 5.0,
          valorTotal: 543.89,
          valorUnidade: 108.78,
          precoMedioCompra: 113.91,
          saldoTickers: 20.0,
          carteira: 2278.27,
        },
        {
          tipoOperacao: "C",
          data: "2025-06-25",
          quantidade: 8.0,
          valorTotal: 1170.04,
          valorUnidade: 146.26,
          precoMedioCompra: 123.15,
          saldoTickers: 28.0,
          carteira: 3448.31,
        },
        {
          tipoOperacao: "C",
          data: "2025-07-01",
          quantidade: 7.0,
          valorTotal: 909.22,
          valorUnidade: 129.89,
          precoMedioCompra: 124.5,
          saldoTickers: 35.0,
          carteira: 4357.53,
        },
        {
          tipoOperacao: "C",
          data: "2025-07-03",
          quantidade: 5.0,
          valorTotal: 668.58,
          valorUnidade: 133.72,
          precoMedioCompra: 125.65,
          saldoTickers: 40.0,
          carteira: 5026.11,
        },
      ],
    },
  },

  ativos: {} as any,

  corretoraTickers: [] as any,

  corretoraSelecionada: null as any,
});
