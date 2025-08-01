<template>
  <div class="p-6 flex justify-center items-center">
    <h1 class="text-3xl font-bold mb-6 text-center w-full">
      Relatório Semanal de Investimentos
    </h1>
  </div>

  <div class="flex flex-wrap justify-center p-1 mx-1">
    <!-- XP Investimentos -->
    <div class="w-auto mx-2 card shadow-xl p-0 m-0 rounded-2xl mb-10">
      <div class="card-body p-0 m-0 rounded-2xl">
        <h2
          class="card-title p-1 m-0 text-base-100 rounded-t-2xl bg-green-700 text-center justify-center"
        >
          XP Invest.
        </h2>
        <div class="p-4 text-right text-2xl font-bold">148.256,39</div>

        <div class="w-full overflow-x-auto px-4">
          <table class="table table-sm w-full text-sm bg-base-100">
            <thead class="text-black">
              <tr>
                <th class="text-left">Data</th>
                <th class="text-right">Fechamento</th>
                <th class="text-right">Evolução</th>
                <th class="text-right">Retirada</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(week, weekIndex) in weeks">
                <tr class="bg-gray-100 font-semibold">
                  <td colspan="4" class="py-1 px-3">
                    Semana {{ weekIndex + 1 }}
                  </td>
                </tr>
                <tr v-for="day in week" :key="'xp-' + day">
                  <td>{{ day }}</td>
                  <td class="text-right">{{ getFechamento(day) }}</td>
                  <td class="text-right bg-gray-100">{{ getEvolucao(day) }}</td>
                  <td></td>
                </tr>
              </template>
              <tr>
                <td class="font-semibold">Total</td>
                <td></td>
                <td class="text-right font-semibold text-blue-800 bg-gray-100">
                  <span>1.871,00</span>
                </td>
                <td class="text-right font-semibold text-red-800">
                  <span>0</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- NOMADE -->
    <div class="w-auto mx-2 card shadow-xl p-0 m-0 rounded-2xl mb-10">
      <div class="card-body p-0 m-0 rounded-2xl">
        <h2
          class="card-title p-1 m-0 text-black rounded-t-2xl bg-yellow-500 text-center justify-center"
        >
          NOMADE
        </h2>
        <div class="p-4 text-right text-2xl font-bold">11.234,56</div>

        <div class="w-full overflow-x-auto px-4">
          <table class="table table-sm w-full text-sm bg-base-100">
            <thead class="text-black">
              <tr>
                <th class="text-left">Data</th>
                <th class="text-right">Fechamento</th>
                <th class="text-right">Evolução</th>
                <th class="text-right">Retirada</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(week, weekIndex) in weeks">
                <tr class="bg-gray-100 font-semibold">
                  <td colspan="4" class="py-1 px-3">
                    Semana {{ weekIndex + 1 }}
                  </td>
                </tr>
                <tr v-for="day in week" :key="'nomade-' + day">
                  <td>{{ day }}</td>
                  <td class="text-right">{{ getFechamentoNomade(day) }}</td>
                  <td class="text-right bg-gray-100">
                    {{ getEvolucaoNomade(day) }}
                  </td>
                  <td></td>
                </tr>
              </template>
              <tr>
                <td class="font-semibold">Total</td>
                <td></td>
                <td class="text-right font-semibold text-blue-800 bg-gray-100">
                  <span>1.500,00</span>
                </td>
                <td class="text-right font-semibold text-red-800">
                  <span>0</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- GENIAL INVESTIMENTOS -->
    <div class="w-auto mx-2 card shadow-xl p-0 m-0 rounded-2xl mb-10">
      <div class="card-body p-0 m-0 rounded-2xl">
        <h2
          class="card-title p-1 m-0 text-white rounded-t-2xl bg-blue-400 text-center justify-center"
        >
          GENIAL INVESTIMENTOS
        </h2>
        <div class="p-4 text-right text-2xl font-bold">19.289,00</div>

        <div class="w-full overflow-x-auto px-4">
          <table class="table table-sm w-full text-sm bg-base-100">
            <thead class="text-black">
              <tr>
                <th class="text-left">Data</th>
                <th class="text-right">Fechamento</th>
                <th class="text-right">Evolução</th>
                <th class="text-right">Retirada</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(week, weekIndex) in weeks">
                <tr class="bg-gray-100 font-semibold">
                  <td colspan="4" class="py-1 px-3">
                    Semana {{ weekIndex + 1 }}
                  </td>
                </tr>
                <tr v-for="day in week" :key="'genial-' + day">
                  <td>{{ day }}</td>
                  <td class="text-right">{{ getFechamentoGenial(day) }}</td>
                  <td class="text-right bg-gray-100">
                    {{ getEvolucaoGenial(day) }}
                  </td>
                  <td></td>
                </tr>
              </template>
              <tr>
                <td class="font-semibold">Total</td>
                <td></td>
                <td class="text-right font-semibold text-blue-800 bg-gray-100">
                  <span>2.589,00</span>
                </td>
                <td class="text-right font-semibold text-red-800">
                  <span>0</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weeks: [
        [1, 2, 3, 4, 5],
        [7, 8, 9, 10, 11],
        [14, 15, 16, 17, 18],
        [21, 22, 23, 24, 25],
        [28, 29, 30, 31],
      ],
      fechamentos: {
        1: "148.256,39",
        2: "151.705,39",
      },
      evolucoes: {
        1: "5.320,00",
        2: "3.449,00",
      },
      fechamentosNomade: {
        1: "11.234,56",
        2: "12.000,00",
      },
      evolucoesNomade: {
        1: "1.234,56",
        2: "265,44",
      },
      fechamentosGenial: {
        1: "17.200,00",
        2: "17.700,00",
        3: "18.100,00",
        4: "18.600,00",
        5: "19.289,00",
      },
      evolucoesGenial: {
        1: "500,00",
        2: "500,00",
        3: "400,00",
        4: "500,00",
        5: "689,00",
      },
    };
  },
  methods: {
    getFechamento(day) {
      return this.fechamentos[day] || "";
    },
    getEvolucao(day) {
      return this.evolucoes[day] || "";
    },
    getFechamentoNomade(day) {
      return this.fechamentosNomade[day] || "";
    },
    getEvolucaoNomade(day) {
      return this.evolucoesNomade[day] || "";
    },
    getFechamentoGenial(day) {
      return this.fechamentosGenial[day] || "";
    },
    getEvolucaoGenial(day) {
      return this.evolucoesGenial[day] || "";
    },
  },
};
</script>
