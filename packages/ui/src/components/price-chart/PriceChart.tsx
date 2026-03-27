export interface PriceChartProps {
  points: Array<{ time: number; value: number }>;
}

export function PriceChart({ points }: PriceChartProps) {
  return <span>{points.length ? "PriceChart" : "-"}</span>;
}
