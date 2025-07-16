import { computed } from "vue";
import { store } from "./storeTicker";
export const useTicker = () => {
  function adicionarOperacao() {
    const operacao = {
      data: store.novaOperacao.data,
      tick: store.novaOperacao.tick.toUpperCase(),
      qtdCompra:
        store.tipoOperacao === "compra"
          ? Number(store.novaOperacao.qtdCompra)
          : null,
      qtdVenda:
        store.tipoOperacao === "venda"
          ? Number(store.novaOperacao.qtdVenda)
          : null,
      valorCompra:
        store.tipoOperacao === "compra"
          ? Number(store.novaOperacao.valorCompra)
          : null,
      valorVenda:
        store.tipoOperacao === "venda"
          ? Number(store.novaOperacao.valorVenda)
          : null,
    };

    store.operacoes.push(operacao);

    // Reset form
    store.novaOperacao = {
      data: new Date().toISOString().split("T")[0],
      tick: "",
      qtdCompra: null,
      qtdVenda: null,
      valorCompra: null,
      valorVenda: null,
    };
  }

  function removerOperacao(index: any) {
    store.operacoes.splice(index, 1);
  }

  // Funções auxiliares
  function formatarMoeda(valor: any) {
    if (valor === null || valor === undefined) return "-";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data: any) {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const relatorioCalculado = computed(() => {
    let saldoPorAtivo = {} as any;
    let valorCarteiraPorAtivo = {} as any;
    let precoMedioPorAtivo = {} as any;

    return store.operacoes.map((op: any) => {
      const ticker = op.tick;

      // Inicializa valores para o ativo se não existirem
      if (!saldoPorAtivo[ticker]) {
        saldoPorAtivo[ticker] = 0;
        valorCarteiraPorAtivo[ticker] = 0;
        precoMedioPorAtivo[ticker] = 0;
      }

      // Atualiza saldo e cálculos para compras
      if (op.qtdCompra !== null && op.valorCompra !== null) {
        const valorTotalCompra = op.qtdCompra * op.valorCompra;
        valorCarteiraPorAtivo[ticker] += valorTotalCompra;
        saldoPorAtivo[ticker] += op.qtdCompra;
        precoMedioPorAtivo[ticker] =
          valorCarteiraPorAtivo[ticker] / saldoPorAtivo[ticker];
      }

      // Calcula resultado para vendas
      let resultado = null;
      if (op.qtdVenda !== null && op.valorVenda !== null) {
        resultado = (op.valorVenda - precoMedioPorAtivo[ticker]) * op.qtdVenda;
        saldoPorAtivo[ticker] -= op.qtdVenda;

        // Se vendeu tudo, zera os valores
        if (saldoPorAtivo[ticker] === 0) {
          valorCarteiraPorAtivo[ticker] = 0;
        }
      }

      return {
        ...op,
        saldo: saldoPorAtivo[ticker],
        precoMedioAtivo:
          op.qtdCompra !== null ? precoMedioPorAtivo[ticker] : null,
        valorCarteiraComprada:
          op.qtdCompra !== null ? valorCarteiraPorAtivo[ticker] : null,
        resultadoNegociacao: resultado,
      };
    });
  });

  return {
    relatorioCalculado,
    formatarMoeda,
    formatarData,
    adicionarOperacao,
    removerOperacao,
  };
};
