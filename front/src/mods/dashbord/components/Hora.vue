<template>
  <div class="w-full md:w-1/5 max-w-md p-4">
    <div class="card bg-base-100 shadow-xl rounded-lg">
      <div class="card-body">
        <h2 class="card-title justify-center text-xl font-semibold mb-4">
          Horários
        </h2>

        <ul class="space-y-2">
          <li
            v-for="zone in timeZones"
            :key="zone.label"
            class="flex justify-between text-lg font-mono"
          >
            <span class="font-medium">{{ zone.label }}</span>
            <span>{{ formatTime(zone.tz) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Timezones e labels
const timeZones = [
  { label: "São Paulo", tz: "America/Sao_Paulo" },
  { label: "Japão", tz: "Asia/Tokyo" },
  { label: "New York", tz: "America/New_York" },
  { label: "Bruxelas", tz: "Europe/Brussels" },
  { label: "London", tz: "Europe/London" },
];

// Tempo atual
const now = ref(new Date());

function formatTime(tz: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
  }).format(now.value);
}

// Atualiza o relógio a cada 30s
let interval: ReturnType<typeof setInterval>;
onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 30000);
});
onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
li {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.25rem;
}
</style>
