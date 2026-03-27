export interface MarketTicker {
  symbol: string;
  price: number;
  changePercent24h: number;
  volume24h: number;
}

export interface MarketListItem {
  symbol: string;
  baseAsset: string;
  name: string;
  iconUrl: string | null;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number | null;
}

// 中文注释：类型定义说明。 (PricePoint)
export interface PricePoint {
  time: number;
  value: number;
}
