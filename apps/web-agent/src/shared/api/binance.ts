import type { MarketTicker, PricePoint } from "@/features/market/types";

const BASE_URL = "https://api.binance.com/api/v3";

interface RawTicker24h {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
}

type RawKline = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
];

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Binance API request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function fetchTicker24h(symbol: string): Promise<MarketTicker> {
  const data = await getJson<RawTicker24h>(`/ticker/24hr?symbol=${symbol}`);
  return {
    symbol: data.symbol,
    price: Number(data.lastPrice),
    changePercent24h: Number(data.priceChangePercent),
    volume24h: Number(data.volume)
  };
}

export async function fetchMarketSnapshot(symbols: string[]): Promise<MarketTicker[]> {
  return Promise.all(symbols.map((symbol) => fetchTicker24h(symbol)));
}

export async function fetchKlines(
  symbol: string,
  interval: "1h" | "4h" | "1d" = "1h",
  limit = 120
): Promise<PricePoint[]> {
  const rows = await getJson<RawKline[]>(`/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
  return rows.map((item) => ({
    time: Math.floor(item[0] / 1000),
    value: Number(item[4])
  }));
}
