<template>
  <div class="card bg-base-100 shadow-xl rounded-lg">
    <div class="card-body">
      <h2 class="card-title justify-center text-xl font-semibold mb-3">
        Criptomoedas
      </h2>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <tbody>
            <tr>
              <td class="font-medium">BTC/USD</td>
              <td class="text-right font-mono">
                {{ formatNumber(rates.btcusd, 1) }}
              </td>
              <td
                :class="getChangeClass(rates.btcusdChange)"
                class="text-right font-mono"
              >
                {{ formatNumber(rates.btcusdChange, 1) }} ({{
                  ((rates.btcusdChange / rates.btcusd) * 100).toFixed(2)
                }}%)
              </td>
            </tr>

            <tr>
              <td class="font-medium">ETH/USD</td>
              <td class="text-right font-mono">
                {{ formatNumber(rates.ethusd, 1) }}
              </td>
              <td
                :class="getChangeClass(rates.ethusdChange)"
                class="text-right font-mono"
              >
                {{ formatNumber(rates.ethusdChange, 1) }} ({{
                  ((rates.ethusdChange / rates.ethusd) * 100).toFixed(2)
                }}%)
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

const { rates, formatNumber, getChangeClass } = useCotacoes();
</script>

<style scoped>
.table td {
  padding: 0.25rem 0.5rem;
}
</style>
