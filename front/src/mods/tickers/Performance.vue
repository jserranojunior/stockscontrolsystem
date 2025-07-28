<template>
  <div class="p-6 flex justify-center items-center">
    <div class="w-full">
      <h1 class="text-3xl font-bold my-4 text-center">
        Performance de Investimentos
      </h1>
    </div>
  </div>
  <div class="flex flex-wrap justify-center p-1">
    <div class="w-full max-w-6xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <!-- Loop através das corretoras -->
        <div
          v-for="corretora in corretoras"
          :key="corretora.nome"
          class="w-full card shadow-xl m-0 rounded-2xl mb-10 p-2"
        >
          <div class="card-body p-0 m-0 rounded-2xl">
            <h2
              class="card-title p-1 m-0 text-white rounded-t-2xl text-center justify-center"
              :class="corretora.cor"
            >
              {{ corretora.nome }}
            </h2>
            <div class="w-full overflow-x-auto">
              <table
                class="table table-xs w-full min-w-[800px] text-sm bg-base-100"
              >
                <thead class="text-black">
                  <tr class="text-xs uppercase tracking-wide">
                    <th></th>
                    <th class="text-center" title="Nome do ativo">ATIVOS</th>
                    <th class="text-right" title="Valor investido">
                      Investido
                    </th>

                    <th
                      class="text-right"
                      title="Quantidade de ativos em carteira"
                    >
                      STOCKS
                    </th>
                    <th class="text-right" title="Preço Médio (Valor Médio)">
                      PMC
                    </th>
                    <th class="text-right"><div class="px-2"></div></th>
                    <th
                      class="text-right"
                      title="Preço atual do ativo no final dia"
                    >
                      P. Atual
                    </th>
                    <th
                      class="text-right"
                      title="Valor total do ativo no final do dia"
                    >
                      Posição
                    </th>

                    <th
                      class="text-right"
                      title="Lucro ou prejuízo acumulado + Variação percentual entre preço médio e valor atual"
                    >
                      Performance
                    </th>

                    <th
                      class="text-right"
                      title="Variação percentual entre preço médio e valor atual"
                    >
                      Var %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Saldo em conta corrente -->

                  <!-- Categorias de ativos -->
                  <tr
                    v-for="categoria in corretora.categorias"
                    :key="categoria.nome"
                    class="bg-gray-200 font-semibold text-xs tracking-wide"
                  >
                    <td colspan="10" class="py-2 px-3">
                      {{ categoria.nome }} {{ categoria.percentual }}%
                    </td>
                  </tr>

                  <!-- Ativos -->
                  <tr
                    v-for="ativo in corretora.ativos"
                    :key="ativo.codigo"
                    class="bg-gray-300 transition"
                  >
                    <td></td>
                    <td class="text-center font-bold">{{ ativo.codigo }}</td>
                    <td class="text-right font-medium">
                      {{ formatCurrency(ativo.valorInvestido) }}
                    </td>

                    <td class="text-right">{{ ativo.quantidade }}</td>
                    <td class="text-right">
                      {{ formatCurrency(ativo.precoMedio) }}
                    </td>
                    <td></td>
                    <td class="text-right">
                      {{ formatCurrency(ativo.precoAtual) }}
                    </td>
                    <td class="text-right">
                      {{ formatCurrency(ativo.valorComprado) }}
                    </td>

                    <td class="text-right">
                      {{ formatCurrency(ativo.performance) }}
                    </td>

                    <td class="text-right">{{ ativo.variacaoPercentual }}%</td>
                  </tr>

                  <!-- Total Diário -->
                  <tr class="bg-gray-200 font-semibold">
                    <td title="Movimentação diaria">Total Diário</td>
                    <td></td>
                    <td class="text-right">
                      {{ formatCurrency(corretora.totalDiario.valorDiario) }}
                    </td>

                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-right">
                      {{ formatCurrency(corretora.totalDiario.valorComprado) }}
                    </td>

                    <td class="text-right">
                      {{ formatCurrency(corretora.totalDiario.performance) }}
                    </td>

                    <td class="text-right">
                      {{ corretora.totalDiario.variacaoPercentual }}%
                    </td>
                  </tr>

                  <!-- Total Corretora -->
                  <tr class="bg-gray-200 font-bold text-sm">
                    <td title="Total Dia Anterior - Final do dia">
                      Total {{ corretora.nome.split(" ")[0] }}
                    </td>
                    <td></td>
                    <td class="text-right">
                      {{ formatCurrency(corretora.totalCorretora.valorDiario) }}
                    </td>

                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td class="text-right">
                      {{
                        formatCurrency(corretora.totalCorretora.valorComprado)
                      }}
                    </td>

                    <td class="text-right">
                      {{ formatCurrency(corretora.totalCorretora.performance) }}
                    </td>

                    <td class="text-right">
                      {{ corretora.totalCorretora.variacaoPercentual }}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      corretoras: [
        {
          nome: "XP Investimentos",
          cor: "bg-green-700",
          saldoCC: 944.39,
          categorias: [
            { nome: "Br.", percentual: 0.64 },
            { nome: "BDRs", percentual: 99.36 },
          ],
          ativos: [
            {
              codigo: "NVDC34",
              quantidade: 4600,
              precoAtual: 17.47,
              valorDiario: 80362.0,
              valorComprado: 80362.0,
              precoMedio: 15.0,
              variacaoPercentual: 6.6,
              valorInvestido: 69000.0,
              performance: 11362.0,
            },
            {
              codigo: "TSLA34",
              quantidade: 1300,
              precoAtual: 51.5,
              valorDiario: 66950.0,
              valorComprado: 66950.0,
              precoMedio: 50.55,
              variacaoPercentual: 1.88,
              valorInvestido: 65715.0,
              performance: 1235.0,
            },
          ],
          totalDiario: {
            valorDiario: 147312.0,
            valorComprado: 148256.39,
            variacaoPercentual: 9.35,
            valorInvestido: 134715.0,
            performance: 12597.0,
          },
          totalCorretora: {
            valorDiario: 148256.39,
            valorComprado: 149200.78,
            variacaoPercentual: 9.29,
            valorInvestido: 135659.39,
            performance: 12597.0,
          },
        },
        {
          nome: "GENIAL INVESTIMENTOS",
          cor: "bg-blue-400",
          saldoCC: 789.0,
          categorias: [
            { nome: "Br.", percentual: 10.0 },
            { nome: "BDRs", percentual: 90.0 },
          ],
          ativos: [
            {
              codigo: "AMZO34",
              quantidade: 50,
              precoAtual: 130.0,
              valorDiario: 6500.0,
              valorComprado: 6500.0,
              precoMedio: 125.0,
              variacaoPercentual: 4.0,
              valorInvestido: 6250.0,
              performance: 250.0,
            },
            {
              codigo: "NFLX34",
              quantidade: 100,
              precoAtual: 120.0,
              valorDiario: 12000.0,
              valorComprado: 12000.0,
              precoMedio: 110.0,
              variacaoPercentual: 9.09,
              valorInvestido: 11000.0,
              performance: 1000.0,
            },
          ],
          totalDiario: {
            valorDiario: 18500.0,
            valorComprado: 18500.0,
            variacaoPercentual: 6.76,
            valorInvestido: 17250.0,
            performance: 1250.0,
          },
          totalCorretora: {
            valorDiario: 19289.0,
            valorComprado: 19289.0,
            variacaoPercentual: 6.48,
            valorInvestido: 18039.0,
            performance: 1250.0,
          },
        },
        {
          nome: "NOMADE",
          cor: "bg-yellow-500 text-black",
          saldoCC: 1234.56,
          categorias: [
            { nome: "Br.", percentual: 0.0 },
            { nome: "BDRs", percentual: 100.0 },
          ],
          ativos: [
            {
              codigo: "AAPL",
              quantidade: 100,
              precoAtual: 100.0,
              valorDiario: 10000.0,
              valorComprado: 10000.0,
              precoMedio: 95.0,
              variacaoPercentual: 5.26,
              valorInvestido: 9500.0,
              performance: 500.0,
            },
          ],
          totalDiario: {
            valorDiario: 10000.0,
            valorComprado: 10000.0,
            variacaoPercentual: 5.26,
            valorInvestido: 9500.0,
            performance: 500.0,
          },
          totalCorretora: {
            valorDiario: 11234.56,
            valorComprado: 11234.56,
            variacaoPercentual: 4.17,
            valorInvestido: 10734.56,
            performance: 500.0,
          },
        },
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      // Implemente sua formatação de moeda aqui
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
};
</script>
