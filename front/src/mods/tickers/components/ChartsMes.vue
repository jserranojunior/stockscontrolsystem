<script setup lang="ts">
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// 1. IMPORTAÇÃO DO STORE
import { store } from '../composables/storeTicker';

// --- Configuração dos Dados ---
const corretorasData = computed(() => store.operacoesSemanaMes.corretoras || []);

// --- Função de Pré-processamento de Dados ---
const processedChartData = computed(() => {
  const data = corretorasData.value;
  if (!data || data.length === 0) return [];

  return data.map((corretora: any) => {
    const categories: string[] = [];
    const seriePosicao: number[] = [];
    const serieInvestido: number[] = [];

    const allDays = corretora.semanas.flatMap((s: any) => s.dias);

    allDays.forEach((dia: any) => {
      const dataStr = dia.totais.data;
      const diaMes = dataStr.substring(dataStr.lastIndexOf('-') + 1);

      categories.push(diaMes);
      // Plota 'posicao_dia' (Série 1)
      seriePosicao.push(dia.totais.posicao_dia || 0);
      // Plota 'investido_dia' (Série 2)
      serieInvestido.push(dia.totais.investido_dia || 0);
    });

    // 2. Retorna a Estrutura de Gráfico com Duas Séries
    return {
      id: corretora.corretora_id,
      name: corretora.corretora_nome,
      // A COR DA CORRETORA SERÁ O VERDE DA SÉRIE 1 (POSIÇÃO)
      color: '#166081',
      categories: categories,
      series: [
        {
          name: 'Posição do Dia',
          data: seriePosicao
        },
        {
          name: 'Valor Investido',
          data: serieInvestido
        }
      ]
    };
  });
});


// --- Função Auxiliar para Opções do Gráfico ---
const getChartOptions = (chartMeta: any) => {
  // Calcula o valor máximo/mínimo nas duas séries combinadas
  const allValues = [...chartMeta.series[0].data, ...chartMeta.series[1].data];
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues, 0);

  // Ajuste de Cores: Série 1 (Posição) = Azul Escuro, Série 2 (Investido) = Laranja
  const seriesColors = [
    chartMeta.color, // Cor da corretora (Fixada em #166081)
    '#E7712F'        // Laranja para a série Valor Investido
  ];

  return {
    title: {
      text: `Posição e Investimento Diário: ${chartMeta.name}`,
      align: 'center',
      style: { fontSize: '16px' }
    },
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    // NOVO: Desativa os rótulos de dados
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '70%', endingShape: 'rounded' },
    },
    // Cores das duas séries
    colors: seriesColors,

    xaxis: {
      categories: chartMeta.categories,
      title: { text: 'Dia do Mês' }
    },
    yaxis: {
      title: { text: 'Valor (R$)' },
      labels: {
        formatter: (value: number) => value ? 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'R$ 0'
      },
      min: minVal < 0 ? Math.floor(minVal * 1.2 / 1000) * 1000 : 0,
      max: Math.ceil(maxVal * 1.2 / 1000) * 1000
    },
    legend: { position: 'top' },
    tooltip: {
      y: {
        formatter: (val: number) => "R$ " + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      }
    }
  };
};
</script>

<template>
  <div v-for="chart in processedChartData" :key="chart.id" class="chart-container">
    <apexchart type="bar" height="350" :options="getChartOptions(chart)" :series="chart.series"></apexchart>
  </div>
</template>

<style scoped>
.chart-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>