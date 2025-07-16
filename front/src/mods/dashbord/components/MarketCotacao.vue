<template>
  <div class="card bg-base-100 shadow-xl rounded-lg">
    <div class="card-body">
      <h2 class="card-title justify-center text-xl font-semibold mb-3">
        Indicadores de Mercado
      </h2>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <tbody>
            <tr>
              <td class="font-medium">US 2Y</td>
              <td class="text-right font-mono">
                {{ formatNumber(rates.us02y, 3) }}
              </td>
              <td
                :class="getChangeClass(rates.us02yChange)"
                class="text-right font-mono"
              >
                {{ formatNumber(rates.us02yChange, 3) }} ({{
                  formatPercent(rates.us02yChangePercent)
                }})
              </td>
            </tr>

            <tr>
              <td class="font-medium">US 10Y</td>
              <td class="text-right font-mono">
                {{ formatNumber(rates.us10y, 3) }}
              </td>
              <td
                :class="getChangeClass(rates.us10yChange)"
                class="text-right font-mono"
              >
                {{ formatNumber(rates.us10yChange, 3) }} ({{
                  formatPercent(rates.us10yChangePercent)
                }})
              </td>
            </tr>

            <tr>
              <td class="font-medium">US 20Y</td>
              <td class="text-right font-mono">
                {{ formatNumber(rates.us20y, 3) }}
              </td>
              <td
                :class="getChangeClass(rates.us20yChange)"
                class="text-right font-mono"
              >
                {{ formatNumber(rates.us20yChange, 3) }} ({{
                  formatPercent(rates.us20yChangePercent)
                }})
              </td>
            </tr>

            <tr>
              <td class="font-medium">US 30Y</td>
              <td class="text-right font-mono">
                {{ formatNumber(rates.us30y, 3) }}
              </td>
              <td
                :class="getChangeClass(rates.us30yChange)"
                class="text-right font-mono"
              >
                {{ formatNumber(rates.us30yChange, 3) }} ({{
                  formatPercent(rates.us30yChangePercent)
                }})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCotacoes } from "../composables/useCotacoes";
const { rates, formatNumber, formatPercent, getChangeClass } = useCotacoes();
</script>

<style scoped>
.table td {
  padding: 0.25rem 0.5rem;
}
</style>
