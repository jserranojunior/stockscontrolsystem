<template>
  <div
    class="w-full max-w-6xl mx-auto card shadow-xl p-0 m-0 rounded-2xl my-12"
  >
    <div class="card-body p-0 m-0 rounded-2xl">
      <!-- Título -->
      <h2
        class="card-title p-3 m-0 text-center justify-center text-lg bg-base-200 rounded-t-2xl"
      >
        Julho&nbsp;2025 - USD
      </h2>

      <!-- Faixa superior com quatro números -->
      <div
        class="grid grid-cols-4 text-center text-xs md:text-sm font-medium border-x border-b border-black"
      >
        <div class="py-1">{{ headerValues.total }}</div>
        <div class="py-1 bg-green-100">{{ headerValues.posAtual }}</div>
        <div class="py-1 bg-yellow-300">{{ headerValues.resultMes }}</div>
        <div class="py-1 bg-yellow-300">{{ headerValues.perfMes }}</div>
      </div>

      <!-- Tabela detalhada -->
      <div class="overflow-x-auto">
        <table class="table w-full text-xs md:text-sm">
          <thead>
            <tr>
              <th class="bg-base-300"> </th>
              <th class="bg-yellow-300 text-center">Cash&nbsp;20/20/24</th>
              <th class="bg-yellow-300 text-center">Cash&nbsp;25‑20</th>
              <th class="bg-yellow-300 text-center">1º&nbsp;Julho</th>
              <th class="bg-base-300 text-center">Pos.&nbsp;Atual</th>
              <th class="bg-base-300 text-center">Resultado</th>
              <th class="bg-base-300 text-center">Performance</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.name"
              :class="row.rowClass"
              class="hover:bg-gray-50"
            >
              <td class="font-semibold">{{ row.name }}</td>
              <td class="text-right">{{ row.cashPrev }}</td>
              <td class="text-right">{{ row.cash2520 }}</td>
              <td class="text-right">{{ row.firstJuly }}</td>
              <td class="text-right">{{ row.posAtual }}</td>
              <td
                class="text-right font-medium"
                :class="getValueClass(row.result)"
              >
                {{ row.result }}
              </td>
              <td
                class="text-right font-medium"
                :class="getValueClass(row.perf, true)"
              >
                {{ row.perf }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Blocos inferiores -->
      <div class="grid grid-cols-4 gap-1 mt-2 text-center text-xs md:text-sm">
        <div class="bg-gray-300 py-2 rounded">Anual 21/24</div>
        <div class="bg-yellow-400 py-2 rounded">Mais Valia 21/25</div>

        <div class="bg-yellow-300 py-2 rounded col-span-1">
          <strong>Perf.&nbsp;2025&nbsp;YTD</strong>
        </div>
        <div class="bg-yellow-100 py-2 rounded">
          <span :class="getValueClass(headerValues.resultMes)">{{
            headerValues.resultMes
          }}</span>
          &nbsp;
          <span :class="getValueClass(headerValues.perfMes, true)">{{
            headerValues.perfMes
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerValues: {
        total: "411.320,39",
        posAtual: "407.195,89",
        resultMes: "4.124,50",
        perfMes: "-1,00%",
      },
      rows: [
        {
          name: "Nomade",
          cashPrev: "0,00",
          cash2520: "407.195,89",
          firstJuly: "411.320,39",
          posAtual: "407.195,89",
          result: "4.124,50",
          perf: "55.214,50",
          rowClass: "bg-purple-50",
        },
        {
          name: "Total",
          cashPrev: "0,00",
          cash2520: "407.195,89",
          firstJuly: "411.320,39",
          posAtual: "407.195,89",
          result: "4.124,50",
          perf: "55.214,50",
          rowClass: "bg-yellow-50 font-semibold",
        },
      ],
    };
  },
  methods: {
    // positvo → verde, negativo → vermelho
    getValueClass(value, allowPercent = false) {
      if (!value) return "";
      const num = parseFloat(
        value.replace(/\./g, "").replace(",", ".").replace("%", "")
      );
      if (isNaN(num)) return "";
      return num >= 0 ? "text-green-600" : "text-red-600";
    },
  },
};
</script>

<style scoped>
/* mantém espaçamentos iguais aos seus outros componentes */
.table th,
.table td {
  padding: 0.35rem 0.5rem;
}
.table tr:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}
</style>
