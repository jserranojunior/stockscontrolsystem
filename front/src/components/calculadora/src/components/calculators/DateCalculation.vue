<template>
  <div class="p-4 space-y-4">
    <!-- Tipo de cálculo -->
    <select
      v-model="type"
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
    >
      <option value="difference">
        {{ __vac_translate("difference_between_date") }}
      </option>
      <option value="operations">
        {{ __vac_translate("add_or_substract_dayjs") }}
      </option>
    </select>

    <!-- Campo 'from' -->
    <div>
      <label class="block mb-1 font-medium text-sm text-gray-700">{{
        __vac_translate("from")
      }}</label>
      <input
        type="date"
        v-model="from"
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>

    <!-- Se diferença entre datas -->
    <div v-if="type === 'difference'" class="space-y-3">
      <div>
        <label class="block mb-1 font-medium text-sm text-gray-700">{{
          __vac_translate("to")
        }}</label>
        <input
          type="date"
          v-model="to"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      <div>
        <h6 class="text-sm text-gray-600">
          {{ __vac_translate("difference") }}
        </h6>
        <h5 class="font-semibold text-lg">{{ difference }}</h5>
        <h5 class="text-gray-600 text-sm">{{ displayed_difference }}</h5>
      </div>
    </div>

    <!-- Se operação de data -->
    <div v-else class="space-y-4">
      <!-- Botões rádio: adicionar ou subtrair -->
      <div class="flex justify-around">
        <label class="inline-flex items-center gap-2">
          <input
            type="radio"
            v-model="operation.type"
            :id="`${id}_date_calculation_operation_1`"
            value="add"
            class="form-radio text-blue-500"
          />
          <span>{{ __vac_translate("add") }}</span>
        </label>

        <label class="inline-flex items-center gap-2">
          <input
            type="radio"
            v-model="operation.type"
            :id="`${id}_date_calculation_operation_2`"
            value="substract"
            class="form-radio text-blue-500"
          />
          <span>{{ __vac_translate("substract") }}</span>
        </label>
      </div>

      <!-- Campos de anos, meses e dias -->
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block mb-1 font-medium text-sm text-gray-700">{{
            __vac_translate("years")
          }}</label>
          <input
            type="number"
            min="0"
            v-model="operation.years"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div>
          <label class="block mb-1 font-medium text-sm text-gray-700">{{
            __vac_translate("months")
          }}</label>
          <input
            type="number"
            min="0"
            v-model="operation.months"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div>
          <label class="block mb-1 font-medium text-sm text-gray-700">{{
            __vac_translate("days")
          }}</label>
          <input
            type="number"
            min="0"
            v-model="operation.days"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
      </div>

      <!-- Resultado da operação -->
      <div>
        <h6 class="text-sm text-gray-600">{{ __vac_translate("date") }}</h6>
        <h5 class="font-semibold text-lg">{{ date_result }}</h5>
        <h5 class="text-gray-600 text-sm">{{ displayed_date_result }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import vac from "../../mixins/vac";
export default {
  name: "DateCalculation",
  mixins: [vac],
  data: () => ({
    type: "difference",
    from: currentDate(),
    to: currentDate(),
    operation: {
      type: "add",
      years: 0,
      months: 0,
      days: 0,
    },
  }),
  computed: {
    difference_dates() {
      const date1 = new Date(this.from).getTime();
      const date2 = new Date(this.to).getTime();
      return Math.abs(date2 - date1);
    },
    difference_days() {
      return this.difference_dates / (1000 * 3600 * 24);
    },
    difference() {
      let diff = this.difference_days;
      let result = [];

      const diffYear = Math.floor(diff / 365);
      diff %= 365;
      if (diffYear > 0)
        result.push(
          `${diffYear} ${
            diffYear > 1
              ? this.__vac_translate("years")
              : this.__vac_translate("year")
          }`
        );

      const diffMonth = Math.floor(diff / 30);
      diff %= 30;
      if (diffMonth > 0)
        result.push(
          `${diffMonth} ${
            diffMonth > 1
              ? this.__vac_translate("months")
              : this.__vac_translate("month")
          }`
        );

      const diffWeek = Math.floor(diff / 7);
      diff %= 7;
      if (diffWeek > 0)
        result.push(
          `${diffWeek} ${
            diffWeek > 1
              ? this.__vac_translate("weeks")
              : this.__vac_translate("week")
          }`
        );

      if (diff > 0)
        result.push(
          `${diff} ${
            diff > 1
              ? this.__vac_translate("days")
              : this.__vac_translate("day")
          }`
        );

      return result.join("; ").toLowerCase();
    },
    displayed_difference() {
      if (this.difference_days === 0)
        return this.__vac_translate("identics_dates");
      if (this.difference_days === 1)
        return `1 ${this.__vac_translate("day").toLowerCase()}`;
      return `${this.difference_days} ${this.__vac_translate(
        "days"
      ).toLowerCase()}`;
    },
    date_operation() {
      let current = new Date(this.from);
      const { days, months, years, type } = this.operation;

      if (type === "add") {
        current.setDate(current.getDate() + +days);
        current.setMonth(current.getMonth() + +months);
        current.setFullYear(current.getFullYear() + +years);
      } else {
        current.setDate(current.getDate() - +days);
        current.setMonth(current.getMonth() - +months);
        current.setFullYear(current.getFullYear() - +years);
      }

      return current;
    },
    date_result() {
      return this.date_operation.toLocaleDateString();
    },
    displayed_date_result() {
      return this.date_operation.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};

function currentDate() {
  const today = new Date();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${m}-${d}`;
}
</script>
