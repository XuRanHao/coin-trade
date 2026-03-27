import { formatVolume } from "./format-volume";

export function formatMarketCap(value: number): string {
  return `$${formatVolume(value)}`;
}
