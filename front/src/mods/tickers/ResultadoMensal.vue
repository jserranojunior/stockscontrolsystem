<template>
  <div class="p-6 flex justify-center items-center">
    <h1 class="text-3xl font-bold mb-6 text-center w-full">
      Resultado Mensal 2025
    </h1>
  </div>

  <div class="flex flex-wrap justify-center p-1 mx-1">
    <!-- Painel Principal (XP + Genial) -->
    <div class="w-full max-w-5xl mx-2 card shadow-xl p-0 m-0 rounded-2xl mb-10">
      <div class="card-body p-0 m-0 rounded-2xl">
        <h2
          class="card-title p-3 m-0 text-white rounded-t-2xl bg-purple-600 text-center justify-center text-lg"
        >
          RESUMO ANUAL - YTD 2025
        </h2>

        <div class="w-full overflow-x-auto px-4 py-2">
          <table class="table w-full text-sm bg-base-100">
            <thead class="text-black bg-gray-100">
              <tr>
                <th class="text-left">Mês</th>
                <th class="text-right bg-green-600 text-white">XP Invest.</th>
                <th class="text-right bg-blue-400 text-white">Genial</th>
                <th class="text-right">Saldo</th>
                <th class="text-right">Resultado</th>
                <th class="text-right bg-yellow-100">Ret/Dep</th>
                <th class="text-right">Valor</th>
                <th class="text-right">%</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(month, index) in monthlyData"
                :key="index"
                class="hover:bg-gray-50"
              >
                <td class="font-medium">{{ month.name }}</td>
                <td class="text-right">{{ month.xp }}</td>
                <td class="text-right">{{ month.genial }}</td>
                <td class="text-right">{{ month.saldo }}</td>
                <td class="text-right">{{ month.resultado31 }}</td>
                <td class="text-right bg-yellow-50">
                  {{ month.retDep || "-" }}
                </td>
                <td
                  class="text-right font-medium"
                  :class="getValueClass(month.resultValue)"
                >
                  {{ month.resultValue }}
                </td>
                <td
                  class="text-right font-medium"
                  :class="getPercentClass(month.resultPercent)"
                >
                  {{ month.resultPercent }}
                </td>
              </tr>

              <!-- Total YTD -->
              <tr class="bg-gray-100 font-bold">
                <td class="text-left">Atual</td>
                <td class="text-right bg-green-600 text-white">151.705,39</td>
                <td class="text-right bg-blue-400 text-white">255.490,50</td>
                <td class="text-right">407.195,89</td>
                <td class="text-right">24.389,60</td>
                <td class="text-right bg-yellow-100">8.000,00</td>
                <td class="text-right"></td>
                <td class="text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tabela Nomade -->
    <div class="w-full max-w-3xl mx-2 card shadow-xl p-0 m-0 rounded-2xl mb-10">
      <div class="card-body p-0 m-0 rounded-2xl">
        <h2
          class="card-title p-3 m-0 text-white rounded-t-2xl bg-purple-600 text-center justify-center text-lg"
        >
          RESUMO ANUAL - YTD 2025
        </h2>

        <div class="w-full overflow-x-auto px-4 py-2">
          <table class="table w-full text-sm bg-base-100">
            <thead class="text-black bg-gray-100">
              <tr>
                <th class="text-left">Mês</th>
                <th class="text-right bg-yellow-400">Nomade</th>
                <th class="text-right">Resultado</th>
                <th class="text-right bg-yellow-100">Ret/Dep</th>
                <th class="text-right">Valor</th>
                <th class="text-right">%</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(month, index) in monthlyData"
                :key="'nomade' + index"
                class="hover:bg-gray-50"
              >
                <td class="font-medium">{{ month.name }}</td>
                <td class="text-right">{{ month.nomade }}</td>
                <td class="text-right">{{ month.resultado31 }}</td>
                <td class="text-right">
                  {{ month.retDep || "-" }}
                </td>
                <td
                  class="text-right font-medium"
                  :class="getValueClass(month.resultValue)"
                >
                  {{ month.resultValue }}
                </td>
                <td
                  class="text-right font-medium"
                  :class="getPercentClass(month.resultPercent)"
                >
                  {{ month.resultPercent }}
                </td>
              </tr>

              <!-- Total Nomade -->
              <tr class="bg-gray-100 font-bold">
                <td class="text-left">Atual</td>
                <td class="text-right bg-yellow-400">753.223,74</td>
                <td class="text-right">24.389,60</td>
                <td class="text-right bg-yellow-50">10.000,00</td>
                <td class="text-right"></td>
                <td class="text-right"></td>
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
      monthlyData: [
        {
          name: "Jan",
          xp: "142.413,07",
          genial: "297.172,42",
          nomade: "100.000,00",
          resultado31: "107.500,00",
          retDep: "5.000,00",
          resultValue: "12.500,00",
          resultPercent: "12,50%",
          saldo: "439.585,49",
        },
        {
          name: "Fev",
          xp: "127.356,19",
          genial: "254.355,01",
          nomade: "107.500,00",
          resultado31: "106.000,00",
          retDep: "",
          resultValue: "-1.500,00",
          resultPercent: "-1,40%",
          saldo: "374.240,19",
        },
        {
          name: "Mar",
          xp: "122.229,23",
          genial: "226.248,67",
          nomade: "106.000,00",
          resultado31: "104.000,00",
          retDep: "",
          resultValue: "-2.000,00",
          resultPercent: "-1,89%",
          saldo: "348.477,90",
        },
        {
          name: "Apr",
          xp: "108.052,78",
          genial: "201.448,38",
          nomade: "104.000,00",
          resultado31: "110.000,00",
          retDep: "3.000,00",
          resultValue: "9.000,00",
          resultPercent: "8,65%",
          saldo: "309.501,16",
        },
        {
          name: "Mai",
          xp: "126.267,37",
          genial: "218.014,88",
          nomade: "110.000,00",
          resultado31: "120.000,00",
          retDep: "2.000,00",
          resultValue: "12.000,00",
          resultPercent: "10,91%",
          saldo: "344.282,25",
        },
        {
          name: "Jun",
          xp: "155.374,00",
          genial: "257.574,50",
          nomade: "120.000,00",
          resultado31: "121.000,00",
          retDep: "",
          resultValue: "1.000,00",
          resultPercent: "0,83%",
          saldo: "412.948,50",
        },
        {
          name: "Jul",
          xp: "153.576,39",
          genial: "257.744,00",
          nomade: "121.000,00",
          resultado31: "119.000,00",
          retDep: "",
          resultValue: "-2.000,00",
          resultPercent: "-1,65%",
          saldo: "411.320,39",
        },
      ],
    };
  },

  methods: {
    getValueClass(value) {
      const num = parseFloat(value?.replace(".", "").replace(",", ".") || 0);
      return num >= 0 ? "text-green-600" : "text-red-600";
    },
    getPercentClass(percent) {
      if (!percent) return "";
      return percent.includes("-") ? "text-red-600" : "text-green-600";
    },
  },
};
</script>

<style scoped>
.table th,
.table td {
  padding: 0.5rem 0.75rem;
}
.table tr:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}
</style>
