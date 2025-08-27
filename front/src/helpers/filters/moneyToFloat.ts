function moneyToFloat(value: string): number {
  return parseFloat(
    value
      .replace(/\./g, "") // Remove o ponto de milhar
      .replace(",", ".") // Troca a vírgula por ponto
  );
}
export default moneyToFloat;
