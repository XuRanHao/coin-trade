export interface MiniTrendChartProps {
  values: number[];
}

// 中文注释：核心逻辑说明。 (MiniTrendChart)
export function MiniTrendChart({ values }: MiniTrendChartProps) {
  return <span>{values.length ? "MiniTrendChart" : "-"}</span>;
}
