import { computed } from "vue";
import { store } from "./storeTicker";
import { httpTickers } from "./httpTickers";
export const useTicker = () => {
  function calcularSaldo(
    saldoTickers: number,
    tipoOperacao: string,
    quantidade: number
  ) {
    if (tipoOperacao === "C") {
      saldoTickers = saldoTickers + quantidade;
    } else if (tipoOperacao === "V") {
      saldoTickers = saldoTickers - quantidade;
    }
    return saldoTickers;
  }

  function calcularCarteira(
    carteira: number,
    tipoOperacao: string,
    valorTotal: number
  ) {
    let newValorCarteira = 0;
    if (tipoOperacao === "C") {
      newValorCarteira = carteira + valorTotal;
    } else if (tipoOperacao === "V") {
      newValorCarteira = carteira - valorTotal;
    }
    return newValorCarteira;
  }

  function calcularUnidade(valorTotal: number, quantidade: number) {
    let valorUnidade;
    if (valorTotal && quantidade) {
      valorUnidade = (valorTotal / quantidade).toFixed(2);
    }
    return valorUnidade;
  }

  async function getCorretoras() {
    await httpTickers()
      .getCorretoras()
      .then((res) => {
        console.log("Corretoras", res);
        store.corretoras = res.data;
      });
  }
  async function getOperacoesSemanaMes() {
    await httpTickers()
      .getOperacoesSemanaMes()
      .then((res) => {
        store.operacoesSemanaMes = res.data;
      });
  }

  function showMessage(message: string) {
    // Implementar lógica para exibir mensagem de erro
    alert(message);
  }

  function converterCampoData(data: string) {
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

  function converterCampos(data: any) {
    // Converter campos numéricos diretamente no store
    data.tickerId = Number(data.tickerId);
    data.quantidade = Number(data.quantidade);
    data.valorTotal = Number(data.valorTotal);
    data.valorUnidade = Number(data.valorUnidade);
    data.carteira = Number(data.carteira);
    data.precoMedioCompra = data.precoMedioCompra
      ? Number(data.precoMedioCompra)
      : null;

    data.saldoTickers = Number(data.saldoTickers);

    return data;
  }

  // No seu componente Vue/React
  async function atualizarOperacao(data: any): Promise<void> {
    // Validação básica antes de enviar
    if (
      !store.editarOperacao.ID ||
      !store.editarOperacao.tickerId ||
      !store.editarOperacao.quantidade
    ) {
      showMessage("Preencha todos os campos obrigatórios");
      return;
    }
    store.editarOperacao.data = converterCampoData(store.editarOperacao.data);
    store.editarOperacao = converterCampos(store.editarOperacao);

    try {
      console.log("Atualizando operação carteira", data.carteira);

      const result = await httpTickers().updateOperacoes(data);

      if (result.data.success) {
        // Sucesso
        console.log(result.data.message, "Operação atualizada com sucesso!");
      } else {
        // Erro
        showMessage(result.data.error || "Erro ao atualizar operação");
      }
    } catch (error) {
      if (error) {
        console.error(error);
        showMessage("Erro inesperado ao atualizar operação");
      }
    }
  }

  // No seu componente Vue/React
  async function adicionarOperacao(): Promise<void> {
    // Validação básica antes de enviar
    if (!store.novaOperacao.tickerId || !store.novaOperacao.quantidade) {
      showMessage("Preencha todos os campos obrigatórios");
      return;
    }
    store.novaOperacao.data = converterCampoData(store.novaOperacao.data);

    store.novaOperacao = converterCampos(store.novaOperacao);

    try {
      const result = await httpTickers().addOperacao(store.novaOperacao);

      if (result.success) {
        // Sucesso
        showMessage(result.message || "Operação adicionada com sucesso!");

        // Limpar formulário
        store.corretoraSelecionada = null;
        store.novaOperacao = {
          tickerId: 0,
          tipoOperacao: "C",
          data: new Date().toISOString().split("T")[0],
          quantidade: 0,
          valorTotal: 0,
          valorUnidade: 0,
          precoMedioCompra: null,
          saldoTickers: 0,
          carteira: null,
        };
      } else {
        // Erro
        showMessage(result.error || "Erro ao adicionar operação");
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  async function getCorretorasComOperacoes() {
    await httpTickers()
      .getCorretorasComOperacoes()
      .then((res) => {
        store.ativos = calcularPosicao(res.data);
      });
  }

  async function getTickersCorretoraID(corretoraID: number) {
    await httpTickers()
      .getTickersCorretoraID(corretoraID)
      .then((res) => {
        store.corretoraTickers = res.data;
      });
  }

  async function getOperacoesID(corretoraID: number) {
    return await httpTickers()
      .getOperacoesID(corretoraID)
      .then((res) => {
        console.log("Operação para editar", res.data.carteira);
        store.editarOperacao = res.data;
        return res.data;
      });
  }

  function calcularTotalDiario(dados: any) {
    for (const corretora of dados) {
      let totalPerformanceDiaria = { quantidade: 0, valor: 0 };
      corretora.totalPerformanceDiaria = totalPerformanceDiaria;
      if (!corretora.operacoes || !Array.isArray(corretora.operacoes)) continue;

      for (let op of corretora.operacoes) {
        if (op.tipoOperacao == "C") {
          totalPerformanceDiaria.quantidade += op.quantidade;
          totalPerformanceDiaria.valor += op.valorTotal;
        } else {
          totalPerformanceDiaria.quantidade -= op.quantidade;
          totalPerformanceDiaria.valor -= op.valorTotal;
        }

        console.log("op diaria", op);
        console.log("total diaria", totalPerformanceDiaria);
      }

      corretora.totalPerformanceDiaria = totalPerformanceDiaria;
    }
  }

  async function getCorretorasComOperacoesPerformance(data: string) {
    await httpTickers()
      .getCorretorasComOperacoesPerformance(data)
      .then((res) => {
        store.ativos = calcularPosicaoOperacoesPerformance(res.data);
        calcularTotalDiario(res.data);
      });
  }

  function calcularPosicaoPerfomance(op: any): number {
    const precoAtual = op.precoAtual ?? 0;
    const quantidade = op.quantidade ?? 0;
    return parseFloat((quantidade * precoAtual).toFixed(2));
  }

  function calcularPerformance(
    posicao: number,
    valorInvestido: number
  ): number {
    return parseFloat((posicao - (valorInvestido ?? 0)).toFixed(2));
  }

  function calcularVariacaoPercentual(
    precoAtual: number,
    precoMedio: number
  ): number {
    if (!precoMedio || precoMedio === 0) return 0;
    const variacao = ((precoAtual - precoMedio) / precoMedio) * 100;
    return parseFloat(variacao.toFixed(2));
  }

  function calcularPosicaoOperacoesPerformance(dados: any) {
    for (const corretora of dados) {
      if (!corretora.operacoes || !Array.isArray(corretora.operacoes)) continue;

      corretora.operacoes = corretora.operacoes.map((op: any) => {
        const posicao = calcularPosicaoPerfomance(op);
        const performance = calcularPerformance(posicao, op.valorTotal);
        const variacaoPercentual = calcularVariacaoPercentual(
          op.precoAtual,
          op.precoMedio
        );

        return {
          ...op,
          posicao,
          performance,
          variacaoPercentual,
        };
      });
    }

    return dados;
  }

  function calcularPosicao(dados: any) {
    // Verifica se existe alguma corretora no objeto
    for (const corretoraKey in dados) {
      const corretora = dados[corretoraKey];

      // Garante que existe array de tickers
      if (!corretora.tickers || !Array.isArray(corretora.tickers)) continue;

      // Itera sobre os tickers da corretora
      corretora.tickers = corretora.tickers.map((ticker: any) => {
        // Verifica se há operações
        if (ticker.operacoes && ticker.operacoes.length > 0) {
          const ultimaOp = ticker.operacoes[ticker.operacoes.length - 1];

          // Calcula a posição
          const precoAtual = ticker.precoAtual ?? 0;
          const saldo = ultimaOp.saldoTickers ?? 0;
          const posicao = parseFloat((saldo * precoAtual).toFixed(2));

          return {
            ...ticker,
            posicao,
          };
        }

        // Caso não haja operações
        return {
          ...ticker,
          posicao: 0,
        };
      });
    }

    return dados;
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
    getCorretoras,
    getCorretorasComOperacoes,
    getCorretorasComOperacoesPerformance,
    getTickersCorretoraID,
    getOperacoesSemanaMes,
    calcularSaldo,
    calcularCarteira,
    calcularUnidade,
    getOperacoesID,
    atualizarOperacao,
  };
};
