import { colors } from "@coin-platform/tokens";
import { formatPercentage } from "@coin-platform/utils";

export interface PriceChangeProps {
  value: number;
}

export function PriceChange({ value }: PriceChangeProps) {
  const color = value > 0 ? colors.priceUp : value < 0 ? colors.priceDown : colors.priceNeutral;
  return <span style={{ color, fontWeight: 600 }}>{formatPercentage(value)}</span>;
}
