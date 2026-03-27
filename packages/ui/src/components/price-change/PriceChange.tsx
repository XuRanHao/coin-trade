import { colors } from "@coin-platform/tokens";
import { formatPercentage } from "@coin-platform/utils";

// 中文注释：类型定义说明。 (PriceChangeProps)
export interface PriceChangeProps {
  value: number;
}

// 中文注释：核心逻辑说明。 (PriceChange)
export function PriceChange({ value }: PriceChangeProps) {
  const color = value > 0 ? colors.priceUp : value < 0 ? colors.priceDown : colors.priceNeutral;
  return <span style={{ color, fontWeight: 600 }}>{formatPercentage(value)}</span>;
}
