export interface CandlestickChartProps {
  candles: Array<{ time: number; open: number; high: number; low: number; close: number }>;
}

// 中文注释：核心逻辑说明。 (CandlestickChart)
export function CandlestickChart({ candles }: CandlestickChartProps) {
  return <span>{candles.length ? "CandlestickChart" : "-"}</span>;
}
