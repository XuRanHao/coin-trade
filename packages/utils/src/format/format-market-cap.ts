import { formatVolume } from "./format-volume";

// 中文注释：核心逻辑说明。 (formatMarketCap)
export function formatMarketCap(value: number): string {
  return `$${formatVolume(value)}`;
}
