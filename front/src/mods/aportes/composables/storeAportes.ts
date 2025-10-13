import { reactive } from "vue";

export const store = reactive({
  aportes: [] as any,

  novoaporte: {
    valor: 0,
    data: new Date(),
  } as any,
});
