export function formatCurrency(value: string | number | null): string {
  if (!value) return "";
  const num = Number(
    String(value)
      .replace(/[^0-9,]/g, "")
      .replace(",", ".")
  );
  if (Number.isNaN(num)) return "";
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function parseCurrencyToNumber(value: string): number {
  return parseFloat(value.replace(",", "."));
}
