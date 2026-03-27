export interface CandlestickChartProps {
  candles: Array<{ time: number; open: number; high: number; low: number; close: number }>;
}

export function CandlestickChart({ candles }: CandlestickChartProps) {
  return <span>{candles.length ? "CandlestickChart" : "-"}</span>;
}
