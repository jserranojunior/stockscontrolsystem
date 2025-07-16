<template>
  <div class="card bg-base-100 shadow-xl rounded-lg">
    <div class="card-body">
      <h2 class="card-title justify-center text-xl font-semibold mb-4">
        Conversor EUR ↔ BRL
      </h2>

      <div class="form-control mb-6">
        <label class="label">
          <span class="label-text font-medium">Valor em Euro (€)</span>
        </label>
        <input
          type="number"
          v-model.number="eurInput"
          class="input input-bordered w-full"
          min="0"
          step="0.01"
          placeholder="1.00"
        />
        <p class="mt-2 text-center text-black">
          {{ formatCurrency(eurToBrl) }}
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
          placeholder="5.40"
        />
        <p class="mt-2 text-center text-black">
          {{ formatEur(brlToEur) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{ eurRate: number }>();

const eurInput = ref(1);
const brlInput = ref(props.eurRate);

const eurToBrl = computed(() => eurInput.value * props.eurRate);
const brlToEur = computed(() =>
  props.eurRate ? brlInput.value / props.eurRate : 0
);

// Sincroniza os inputs para manter consistência ao alterar um ou outro
watch(eurToBrl, (val) => {
  if (brlInput.value !== val) brlInput.value = Number(val.toFixed(2));
});
watch(brlToEur, (val) => {
  if (eurInput.value !== val) eurInput.value = Number(val.toFixed(2));
});

function formatEur(value: number | string): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR",
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
