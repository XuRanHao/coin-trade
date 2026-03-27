export interface MarketTicker {
  symbol: string;
  price: number;
  changePercent24h: number;
  volume24h: number;
}

export interface PricePoint {
  time: number;
  value: number;
}
