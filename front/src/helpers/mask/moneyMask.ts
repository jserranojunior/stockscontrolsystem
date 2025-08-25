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

export { moneyMask, formatarMoeda };
