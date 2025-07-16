<template>
  <!-- Card Conversor USD ↔ BRL -->

  <div class="card bg-base-100 shadow-xl rounded-lg">
    <div class="card-body">
      <h2 class="card-title justify-center text-xl font-semibold mb-4">
        Conversor USD ↔ BRL
      </h2>

      <div class="form-control mb-6">
        <label class="label">
          <span class="label-text font-medium">Valor em Dólar (US$)</span>
        </label>
        <input
          type="number"
          v-model.number="usdInput"
          class="input input-bordered w-full"
          min="0"
          step="0.01"
          placeholder="1.00"
        />
        <p class="mt-2 text-center text-black">
          {{ formatCurrency(usdToBrl) }}
        </p>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Valor em Real (R$)</span>
        </label>
        <input
          type="number"
          v-model.number="brlInput"
          class="input input-bordered w-full"
          min="0"
          step="0.01"
          placeholder="5.00"
        />
        <p class="mt-2 text-center text-black">
          {{ formatUsd(brlToUsd) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{ usdRate: number }>();

const usdInput = ref(1);
const brlInput = ref(props.usdRate);

const usdToBrl = computed(() => usdInput.value * props.usdRate);
const brlToUsd = computed(() =>
  props.usdRate ? brlInput.value / props.usdRate : 0
);

// Sincroniza os inputs para manter a consistência ao alterar um ou outro
watch(usdToBrl, (val) => {
  if (brlInput.value !== val) brlInput.value = Number(val.toFixed(2));
});
watch(brlToUsd, (val) => {
  if (usdInput.value !== val) usdInput.value = Number(val.toFixed(2));
});

function formatUsd(value: number | string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

function formatCurrency(value: number | string): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}
</script>
