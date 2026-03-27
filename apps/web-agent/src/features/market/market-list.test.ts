import { describe, expect, it } from "vitest";
import { filterMarketItems, paginateMarketItems, sortMarketItems, type MarketSortKey, type MarketSortOrder } from "./market-list";
import type { MarketListItem } from "./types";

const marketRows: MarketListItem[] = [
  {
    symbol: "BTCUSDT",
    baseAsset: "BTC",
    name: "Bitcoin",
    iconUrl: "https://cdn.a/btc.png",
    price: 68000,
    change24h: -2.3,
    volume24h: 40440000000,
    marketCap: 1350000000000
  },
  {
    symbol: "ETHUSDT",
    baseAsset: "ETH",
    name: "Ethereum",
    iconUrl: "https://cdn.a/eth.png",
    price: 3200,
    change24h: 1.2,
    volume24h: 18460000000,
    marketCap: 246500000000
  },
  {
    symbol: "FAKEUSDT",
    baseAsset: "FAKE",
    name: "Fake Token",
    iconUrl: null,
    price: 0.2,
    change24h: -8,
    volume24h: 100000,
    marketCap: null
  }
];

describe("market list pipeline", () => {
  it("filters by symbol and name case-insensitively", () => {
    expect(filterMarketItems(marketRows, "btc")).toHaveLength(1);
    expect(filterMarketItems(marketRows, "ether")).toHaveLength(1);
    expect(filterMarketItems(marketRows, "usdt")).toHaveLength(3);
  });

  it("sorts market cap with null values always at bottom", () => {
    const desc = sortMarketItems(marketRows, "marketCap", "desc");
    const asc = sortMarketItems(marketRows, "marketCap", "asc");

    expect(desc.at(-1)?.symbol).toBe("FAKEUSDT");
    expect(asc.at(-1)?.symbol).toBe("FAKEUSDT");
  });

  it("paginates data and clamps out-of-range page index", () => {
    const result = paginateMarketItems(marketRows, 5, 2);
    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(2);
    expect(result.pageData).toHaveLength(1);
  });

  it.each<[MarketSortKey, MarketSortOrder]>([
    ["price", "desc"],
    ["change24h", "asc"],
    ["volume24h", "desc"]
  ])("sorts by %s in %s order", (sortKey, sortOrder) => {
    const sorted = sortMarketItems(marketRows, sortKey, sortOrder);
    expect(sorted).toHaveLength(3);
  });
});
