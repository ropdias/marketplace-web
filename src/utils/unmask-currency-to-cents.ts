export function unmaskCurrencyToCents(value: string): number {
  const numeric = value.replace(/[^\d]/g, '')
  if (!numeric) return 0
  return Math.round(Number(numeric))
}
