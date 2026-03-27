const thresholds = [
  { value: 1e12, symbol: "T" },
  { value: 1e9, symbol: "B" },
  { value: 1e6, symbol: "M" },
  { value: 1e3, symbol: "K" }
];

// 中文注释：核心逻辑说明。 (formatVolume)
export function formatVolume(value: number): string {
  const absValue = Math.abs(value);
  const matched = thresholds.find((item) => absValue >= item.value);
  if (!matched) return value.toFixed(2);
  return `${(value / matched.value).toFixed(2)}${matched.symbol}`;
}
