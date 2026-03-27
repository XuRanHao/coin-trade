import { describe, expect, it } from "vitest";
import { mergeCoinMetadataMap } from "./binance";

describe("mergeCoinMetadataMap", () => {
  it("keeps the entry with larger market cap when symbol duplicates", () => {
    const merged = mergeCoinMetadataMap(
      {},
      [
        { symbol: "abc", name: "Alpha", market_cap: 100, image: "https://cdn.a/icon-a.png" },
        { symbol: "ABC", name: "Alpha Prime", market_cap: 200, image: "https://cdn.a/icon-b.png" }
      ]
    );

    expect(merged.ABC).toEqual({
      name: "Alpha Prime",
      marketCap: 200,
      iconUrl: "https://cdn.a/icon-b.png"
    });
  });

  it("preserves null market cap when source has no value", () => {
    const merged = mergeCoinMetadataMap(
      {},
      [{ symbol: "xyz", name: "XYZ Coin", market_cap: null, image: null }]
    );

    expect(merged.XYZ).toEqual({
      name: "XYZ Coin",
      marketCap: null,
      iconUrl: null
    });
  });

  it("keeps previous non-null market cap when incoming duplicate is null", () => {
    const base = {
      BTC: {
        name: "Bitcoin",
        marketCap: 1000,
        iconUrl: "https://cdn.a/btc.png"
      }
    };

    const merged = mergeCoinMetadataMap(
      base,
      [{ symbol: "btc", name: "Bitcoin Mirror", market_cap: null, image: null }]
    );

    expect(merged.BTC).toEqual({
      name: "Bitcoin",
      marketCap: 1000,
      iconUrl: "https://cdn.a/btc.png"
    });
  });

  it("fills icon from duplicate row when current icon is missing", () => {
    const merged = mergeCoinMetadataMap(
      {
        SOL: {
          name: "Solana",
          marketCap: 200,
          iconUrl: null
        }
      },
      [{ symbol: "sol", name: "Solana", market_cap: null, image: "https://cdn.a/sol.png" }]
    );

    expect(merged.SOL).toEqual({
      name: "Solana",
      marketCap: 200,
      iconUrl: "https://cdn.a/sol.png"
    });
  });
});
