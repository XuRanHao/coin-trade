export interface PriceChartProps {
  points: Array<{ time: number; value: number }>;
}

// 中文注释：核心逻辑说明。 (PriceChart)
export function PriceChart({ points }: PriceChartProps) {
  return <span>{points.length ? "PriceChart" : "-"}</span>;
}
