<template>
  <div class="card bg-base-100 shadow-xl rounded-lg">
    <div class="card-body">
      <h2 class="card-title justify-center text-xl font-semibold mb-6">
        {{ monthYear }}
      </h2>

      <div class="grid grid-cols-7 gap-1 text-center">
        <div class="font-bold text-sm" v-for="day in weekDays" :key="day">
          {{ day }}
        </div>
        <div
          v-for="(day, index) in blanks"
          :key="'blank-' + index"
          class="p-2"
        ></div>
        <button
          v-for="day in daysInMonth"
          :key="day"
          class="btn btn-sm btn-ghost cursor-default rounded-none"
          :class="{ 'bg-base-200 text-red-700 font-bold': isToday(day) }"
        >
          {{ day }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const today = new Date();

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const year = today.getFullYear();
const month = today.getMonth();

const monthYear = today.toLocaleDateString("pt-BR", {
  year: "numeric",
  month: "long",
});

const firstDayOfMonth = new Date(year, month, 1);
const lastDayOfMonth = new Date(year, month + 1, 0);

const blanks = computed(() => {
  // Quantos dias em branco antes do dia 1 (ex: se o mês começa na quarta, tem 3 blanks)
  const wd = firstDayOfMonth.getDay(); // 0 = domingo ... 6 = sábado
  return Array(wd).fill(null);
});

const daysInMonth = Array.from(
  { length: lastDayOfMonth.getDate() },
  (_, i) => i + 1
);

function isToday(day: number) {
  return (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  );
}
</script>
