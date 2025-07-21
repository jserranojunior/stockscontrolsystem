<template>
  <div class="w-full sm:w-1/3 p-2">
    <div class="card bg-base-100 shadow-xl rounded-lg">
      <div class="card-body">
        <h2 class="card-title justify-center text-xl font-semibold mb-3">
          Moedas
        </h2>

        <div class="overflow-x-auto">
          <table class="table w-full">
            <tbody>
              <tr>
                <td class="font-medium">EUR/USD</td>
                <td class="text-right font-mono">
                  {{ formatNumber(rates.eurusd, 5) }}
                </td>
                <td
                  :class="getChangeClass(rates.eurusdChange)"
                  class="text-right font-mono"
                >
                  {{ formatNumber(rates.eurusdChange, 5) }} ({{
                    ((rates.eurusdChange / rates.eurusd) * 100).toFixed(2)
                  }}%)
                </td>
              </tr>

              <tr>
                <td class="font-medium">EUR/BRL</td>
                <td class="text-right font-mono">
                  {{ formatNumber(rates.eurbrl, 4) }}
                </td>
                <td
                  :class="getChangeClass(rates.eurbrlChange)"
                  class="text-right font-mono"
                >
                  {{ formatNumber(rates.eurbrlChange, 4) }} ({{
                    ((rates.eurbrlChange / rates.eurbrl) * 100).toFixed(2)
                  }}%)
                </td>
              </tr>

              <tr>
                <td class="font-medium">USD/BRL</td>
                <td class="text-right font-mono">
                  {{ formatNumber(rates.usdbrl, 4) }}
                </td>
                <td
                  :class="getChangeClass(rates.usdbrlChange)"
                  class="text-right font-mono"
                >
                  {{ formatNumber(rates.usdbrlChange, 4) }} ({{
                    ((rates.usdbrlChange / rates.usdbrl) * 100).toFixed(2)
                  }}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCotacoes } from "../composables/useCotacoes";

const { rates, formatNumber, getChangeClass } = useCotacoes();
</script>

<style scoped>
.table td {
  padding: 0.25rem 0.5rem;
}
</style>
