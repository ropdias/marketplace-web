export function parseCurrency(value: string): number {
  return Number(value.replace(/[^\d]/g, '')) / 100
}
