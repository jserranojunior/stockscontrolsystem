import { nextTick } from "vue";

const moneyMask = {
  decimal: ",",
  thousands: ".",
  prefix: " ",
  suffix: "",
  precision: 2,
  masked: true, // Habilitar a máscara enquanto o usuário digita
};

function formatarMoeda(valor: any) {
  // Garante que é número
  const numero = Number(valor) || 0;

  // Formata no padrão brasileiro
  return numero
    .toFixed(moneyMask.precision) // "7732.42"
    .replace(".", moneyMask.decimal) // "7732,42"
    .replace(/\B(?=(\d{3})+(?!\d))/g, moneyMask.thousands); // "7.732,42"
}
function parseMoeda(valor: string): number {
  if (!valor) return 0;

  // Remove os separadores de milhar (pontos)
  let semPontos = valor.replace(/\./g, "");

  // Substitui a vírgula decimal por ponto
  let comPonto = semPontos.replace(",", ".");

  // Converte para float
  return parseFloat(comPonto) || 0;
}

function formatCurrencyExcel(value: string): string {
  if (!value) return "";

  // remove tudo que não seja dígito ou vírgula
  let clean = value.replace(/[^\d,]/g, "");

  let integerPart = "";
  let cents = "";

  if (clean.includes(",")) {
    // se o usuário digitou vírgula
    const parts = clean.split(",");
    integerPart = parts[0];
    cents = (parts[1] || "").padEnd(2, "0").slice(0, 2);
  } else {
    // sem vírgula, últimos 2 dígitos = centavos
    while (clean.length < 3) clean = "0" + clean;
    integerPart = clean.slice(0, -2);
    cents = clean.slice(-2);
  }

  // remove zeros à esquerda da parte inteira
  integerPart = integerPart.replace(/^0+/, "");
  if (!integerPart) integerPart = "0";

  // adiciona separadores de milhar
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${integerPart},${cents}`;
}
export { moneyMask, formatarMoeda, parseMoeda, formatCurrencyExcel };
