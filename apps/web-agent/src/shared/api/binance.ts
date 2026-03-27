import type { MarketListItem, MarketTicker, PricePoint } from "@/features/market/types";
import { FALLBACK_MARKET_METADATA } from "./market-cap-fallback";

const BINANCE_BASE_URL = "https://api.binance.com/api/v3";
const ALTERNATIVE_BASE_URL = "https://api.alternative.me/v2";
const COINLORE_BASE_URL = "https://api.coinlore.net/api";
const COINLORE_PAGE_SIZE = 100;
const COINLORE_MAX_PAGES = 5;

interface RawTicker24h {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
  quoteVolume?: string;
}

interface RawExchangeInfo {
  symbols: RawExchangeSymbol[];
}

interface RawExchangeSymbol {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
}

interface RawMarketMetadata {
  symbol: string;
  name: string;
  market_cap: number | null;
  image?: string | null;
}

interface RawAlternativeTicker {
  symbol?: string;
  name?: string;
  quotes?: {
    USD?: {
      market_cap?: number | string | null;
    };
  };
}

interface RawAlternativeTickerResponse {
  data: Record<string, RawAlternativeTicker> | RawAlternativeTicker[];
  metadata?: {
    error?: string | null;
  };
}

interface RawCoinLoreTicker {
  symbol: string;
  name: string;
  market_cap_usd: string;
}

interface RawCoinLoreTickerResponse {
  data: RawCoinLoreTicker[];
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

export interface CoinMetadata {
  name: string;
  marketCap: number | null;
  iconUrl: string | null;
}

export type CoinMetadataMap = Record<string, CoinMetadata>;

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

function getBinanceJson<T>(path: string): Promise<T> {
  return getJson<T>(`${BINANCE_BASE_URL}${path}`);
}

function getAlternativeJson<T>(path: string): Promise<T> {
  return getJson<T>(`${ALTERNATIVE_BASE_URL}${path}`);
}

function getCoinLoreJson<T>(path: string): Promise<T> {
  return getJson<T>(`${COINLORE_BASE_URL}${path}`);
}

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toOptionalNumber(value: number | string | null | undefined): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function normalizeMarketCap(value: number | null): number | null {
  if (value === null || !Number.isFinite(value)) return null;
  return value;
}

function normalizeIconUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

export function mergeCoinMetadataMap(base: CoinMetadataMap, coins: RawMarketMetadata[]): CoinMetadataMap {
  const merged: CoinMetadataMap = { ...base };

  for (const coin of coins) {
    const normalizedSymbol = coin.symbol.trim().toUpperCase();
    if (!normalizedSymbol) continue;

    const incomingMarketCap = normalizeMarketCap(coin.market_cap);
    const incomingName = coin.name.trim() || normalizedSymbol;
    const incomingIconUrl = normalizeIconUrl(coin.image);
    const existing = merged[normalizedSymbol];

    if (!existing) {
      merged[normalizedSymbol] = {
        name: incomingName,
        marketCap: incomingMarketCap,
        iconUrl: incomingIconUrl
      };
      continue;
    }

    const shouldReplace =
      (existing.marketCap === null && incomingMarketCap !== null) ||
      (existing.marketCap !== null && incomingMarketCap !== null && incomingMarketCap > existing.marketCap);

    if (shouldReplace) {
      merged[normalizedSymbol] = {
        name: incomingName,
        marketCap: incomingMarketCap,
        iconUrl: incomingIconUrl
      };
      continue;
    }

    if (!existing.name && incomingName) {
      merged[normalizedSymbol] = {
        name: incomingName,
        marketCap: existing.marketCap,
        iconUrl: existing.iconUrl ?? incomingIconUrl
      };
      continue;
    }

    if (!existing.iconUrl && incomingIconUrl) {
      merged[normalizedSymbol] = {
        ...existing,
        iconUrl: incomingIconUrl
      };
    }
  }

  return merged;
}

function mergeMetadataMaps(base: CoinMetadataMap, incoming: CoinMetadataMap): CoinMetadataMap {
  const rows: RawMarketMetadata[] = Object.entries(incoming).map(([symbol, metadata]) => ({
    symbol,
    name: metadata.name,
    market_cap: metadata.marketCap,
    image: metadata.iconUrl
  }));

  return mergeCoinMetadataMap(base, rows);
}

function toAlternativeMetadataRows(
  data: Record<string, RawAlternativeTicker> | RawAlternativeTicker[]
): RawMarketMetadata[] {
  const rows = Array.isArray(data) ? data : Object.values(data ?? {});

  return rows.map((row) => ({
    symbol: row.symbol?.trim() ?? "",
    name: row.name?.trim() ?? row.symbol?.trim() ?? "",
    market_cap: toOptionalNumber(row.quotes?.USD?.market_cap),
    image: null
  }));
}

async function fetchAlternativeMetadataMap(): Promise<CoinMetadataMap> {
  const response = await getAlternativeJson<RawAlternativeTickerResponse>("/ticker/?limit=0");
  if (response.metadata?.error) {
    throw new Error(`Alternative metadata provider failed: ${response.metadata.error}`);
  }

  return mergeCoinMetadataMap({}, toAlternativeMetadataRows(response.data));
}

async function fetchCoinLoreMetadataMap(): Promise<CoinMetadataMap> {
  let metadataMap: CoinMetadataMap = {};

  for (let page = 0; page < COINLORE_MAX_PAGES; page += 1) {
    const start = page * COINLORE_PAGE_SIZE;
    const response = await getCoinLoreJson<RawCoinLoreTickerResponse>(`/tickers/?start=${start}&limit=${COINLORE_PAGE_SIZE}`);

    const rows: RawMarketMetadata[] = response.data.map((row) => ({
      symbol: row.symbol,
      name: row.name,
      market_cap: toOptionalNumber(row.market_cap_usd),
      image: null
    }));

    metadataMap = mergeCoinMetadataMap(metadataMap, rows);

    if (response.data.length < COINLORE_PAGE_SIZE) {
      break;
    }
  }

  return metadataMap;
}

async function fetchRemoteMarketMetadataMap(): Promise<CoinMetadataMap> {
  try {
    const alternativeMap = await fetchAlternativeMetadataMap();
    if (Object.keys(alternativeMap).length > 0) {
      return alternativeMap;
    }
  } catch {
    // Ignore and continue to the secondary source.
  }

  const coinLoreMap = await fetchCoinLoreMetadataMap();
  if (Object.keys(coinLoreMap).length === 0) {
    throw new Error("No remote market metadata available");
  }

  return coinLoreMap;
}

async function fetchMergedMarketMetadataMap(): Promise<CoinMetadataMap> {
  let metadataMap: CoinMetadataMap = { ...FALLBACK_MARKET_METADATA };

  try {
    const remoteMap = await fetchRemoteMarketMetadataMap();
    metadataMap = mergeMetadataMaps(metadataMap, remoteMap);
  } catch {
    // Network-restricted environments keep using the local fallback map.
  }

  return metadataMap;
}

export async function fetchTicker24h(symbol: string): Promise<MarketTicker> {
  const encodedSymbol = encodeURIComponent(symbol);
  const data = await getBinanceJson<RawTicker24h>(`/ticker/24hr?symbol=${encodedSymbol}`);
  return {
    symbol: data.symbol,
    price: toNumber(data.lastPrice),
    changePercent24h: toNumber(data.priceChangePercent),
    volume24h: toNumber(data.quoteVolume ?? data.volume)
  };
}

export async function fetchMarketSnapshot(symbols: string[]): Promise<MarketTicker[]> {
  return Promise.all(symbols.map((symbol) => fetchTicker24h(symbol)));
}

export async function fetchUSDTMarketList(): Promise<MarketListItem[]> {
  const [exchangeInfo, tickers, metadataMap] = await Promise.all([
    getBinanceJson<RawExchangeInfo>("/exchangeInfo"),
    getBinanceJson<RawTicker24h[]>("/ticker/24hr"),
    fetchMergedMarketMetadataMap()
  ]);

  const tickerMap = new Map(tickers.map((ticker) => [ticker.symbol, ticker]));
  const rows: MarketListItem[] = [];

  for (const symbolInfo of exchangeInfo.symbols) {
    if (symbolInfo.quoteAsset !== "USDT" || symbolInfo.status !== "TRADING") {
      continue;
    }

    const ticker = tickerMap.get(symbolInfo.symbol);
    if (!ticker) continue;

    const metadata = metadataMap[symbolInfo.baseAsset.toUpperCase()];
    rows.push({
      symbol: symbolInfo.symbol,
      baseAsset: symbolInfo.baseAsset,
      name: metadata?.name ?? symbolInfo.baseAsset,
      iconUrl: metadata?.iconUrl ?? null,
      price: toNumber(ticker.lastPrice),
      change24h: toNumber(ticker.priceChangePercent),
      volume24h: toNumber(ticker.quoteVolume ?? ticker.volume),
      marketCap: metadata?.marketCap ?? null
    });
  }

  return rows;
}

export async function fetchKlines(
  symbol: string,
  interval: "1h" | "4h" | "1d" = "1h",
  limit = 120
): Promise<PricePoint[]> {
  const encodedSymbol = encodeURIComponent(symbol);
  const rows = await getBinanceJson<RawKline[]>(`/klines?symbol=${encodedSymbol}&interval=${interval}&limit=${limit}`);
  return rows.map((item) => ({
    time: Math.floor(item[0] / 1000),
    value: toNumber(item[4])
  }));
}
