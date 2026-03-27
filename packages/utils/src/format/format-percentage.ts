// 中文注释：核心逻辑说明。 (formatPercentage)
export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
