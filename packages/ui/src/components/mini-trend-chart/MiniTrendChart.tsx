export interface MiniTrendChartProps {
  values: number[];
}

export function MiniTrendChart({ values }: MiniTrendChartProps) {
  return <span>{values.length ? "MiniTrendChart" : "-"}</span>;
}
