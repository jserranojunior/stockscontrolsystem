<template>
  <div
    :id="id"
    class="relative w-full border rounded outline-none"
    tabindex="-1"
  >
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
      :class="{
        'opacity-100 pointer-events-auto': open_sidebar,
        'opacity-0 pointer-events-none': !open_sidebar,
      }"
      @click="open_sidebar = !open_sidebar"
    ></div>

    <!-- Sidebar -->
    <nav
      class="fixed top-0 left-0 h-full w-64 bg-white flex flex-col justify-between z-40 transform transition-transform duration-300"
      :class="{
        'translate-x-0': open_sidebar,
        '-translate-x-full': !open_sidebar,
      }"
    >
      <!-- Botão de fechar -->
      <div
        class="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
        @click="open_sidebar = !open_sidebar"
      >
        <i class="fas fa-times"></i>
      </div>

      <!-- Cabeçalho -->
      <div class="px-4 pt-4 text-center">
        <h4 class="text-lg font-bold">{{ title }}</h4>
        <h5 class="text-sm text-gray-500">{{ description }}</h5>
      </div>

      <!-- Menu -->
      <div class="px-4 overflow-y-auto">
        <ul class="space-y-2">
          <h5 class="text-sm font-bold text-gray-500">
            {{ __vac_translate("calculator") }}
          </h5>
          <li v-for="item in calculatorItems" :key="item.mode">
            <a
              href="#"
              class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
              :class="{ 'bg-blue-100 font-semibold': mode === item.mode }"
              @click.prevent="changeMode(item.mode)"
            >
              <i :class="item.icon"></i>
              {{ __vac_translate(item.label) }}
            </a>
          </li>

          <h5 class="mt-4 text-sm font-bold text-gray-500">
            {{ __vac_translate("converter") }}
          </h5>
          <li v-for="item in converterItems" :key="item.mode">
            <a
              href="#"
              class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
              :class="{ 'bg-blue-100 font-semibold': mode === item.mode }"
              @click.prevent="changeMode(item.mode)"
            >
              <i :class="item.icon"></i>
              {{ __vac_translate(item.label) }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Rodapé -->
      <div class="p-4">
        <button class="w-full text-sm bg-gray-200 py-2 rounded">
          {{ __vac_translate("about") }}
        </button>
      </div>
    </nav>

    <!-- Conteúdo -->
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <button
          class="text-white bg-gray-600 hover:bg-gray-700 p-2 rounded cursor-pointer"
          @click="open_sidebar = !open_sidebar"
        >
          <Icon icon="arcticons:opencalc" width="20" height="20"></Icon>
        </button>
        <div class="text-center">
          <h4 class="text-lg font-bold">{{ __vac_translate(mode) }}</h4>
          <h5 class="text-sm text-gray-500 m-0">{{ title }}</h5>
        </div>
        <button class="bg-gray-200 p-2 rounded">
          <i class="fa fa-undo"></i>
        </button>
      </div>

      <!-- Componentes dinâmicos -->
      <date-calculation
        v-if="mode === 'date_calculation'"
        :locale="locale"
        :id="id"
      />
      <weight-and-mass
        v-else-if="mode === 'weight_and_mass'"
        :locale="locale"
        :id="id"
      />
      <data-converter v-else-if="mode === 'data'" :locale="locale" :id="id" />
      <area-converter v-else-if="mode === 'area'" :locale="locale" :id="id" />
      <component v-else :is="mode" :locale="locale" :id="id" />
    </div>
  </div>
</template>

<script>
import DateCalculation from "./components/calculators/DateCalculation.vue";
import Scientific from "./components/calculators/Scientific.vue";
import Standard from "./components/calculators/Standard.vue";
import Area from "./components/converters/Area.vue";
import Data from "./components/converters/Data.vue";
import Hour from "./components/converters/Hour.vue";
import Length from "./components/converters/Length.vue";
import Temperature from "./components/converters/Temperature.vue";
import Energy from "./components/converters/Energy.vue";
import Volume from "./components/converters/Volume.vue";
import WeightAndMass from "./components/converters/WeightAndMass.vue";
import Angle from "./components/converters/Angle.vue";
import Pressure from "./components/converters/Pressure.vue";
import Power from "./components/converters/Power.vue";

import vac from "./mixins/vac";
import { Icon } from "@iconify/vue";
export default {
  name: "VueAdvancedCalculator",
  components: {
    Standard,
    Scientific,
    DateCalculation,
    DataConverter: Data,
    Hour,
    WeightAndMass,
    AreaConverter: Area,
    Length,
    Volume,
    Temperature,
    Energy,
    Angle,
    Pressure,
    Power,
  },
  mixins: [vac],
  props: {
    id: { type: String, default: "vac-" + new Date().getTime() },
    title: { type: String, default: "Calculadora Cientifica" },
    description: {
      type: String,
      default: "Altere o tipo de calculadora clicando no menu lateral.",
    },
    defaultMode: { type: String, default: "standard" },
    locale: { type: String, default: "fr" },
  },
  data() {
    return {
      open_sidebar: false,
      mode: "",
      calculatorItems: [
        { mode: "standard", label: "standard", icon: "fa fa-calculator" },
        { mode: "scientific", label: "scientific", icon: "fa fa-flask" },
        {
          mode: "date_calculation",
          label: "date_calculation",
          icon: "fa fa-calendar",
        },
      ],
      converterItems: [
        { mode: "area", label: "area", icon: "fa fa-square" },
        {
          mode: "weight_and_mass",
          label: "weight_and_mass",
          icon: "fa fa-weight",
        },
        { mode: "data", label: "data", icon: "fa fa-database" },
      ],
    };
  },

  mounted() {
    this.mode = this.defaultMode;
  },

  methods: {
    /**
     * Change le type de calculatrice
     *
     * @param {String} mode
     */
    changeMode(mode) {
      this.mode = mode;
      this.open_sidebar = false;
    },
  },
};
</script>

<style scoped>
@import url("./assets/styles/core.css");
</style>
