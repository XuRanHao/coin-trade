import type { MarketListItem } from "./types";

export type MarketSortKey = "symbol" | "price" | "change24h" | "volume24h" | "marketCap";
export type MarketSortOrder = "asc" | "desc";

export interface PaginatedMarketResult {
  pageData: MarketListItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function isMarketSortKey(value: string): value is MarketSortKey {
  return value === "symbol" || value === "price" || value === "change24h" || value === "volume24h" || value === "marketCap";
}

export function filterMarketItems(items: MarketListItem[], query: string): MarketListItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return items;

  return items.filter((item) => {
    const symbolText = item.symbol.toLowerCase();
    const nameText = item.name.toLowerCase();
    return symbolText.includes(normalizedQuery) || nameText.includes(normalizedQuery);
  });
}

function compareWithOrder(left: number, right: number, order: MarketSortOrder): number {
  return order === "asc" ? left - right : right - left;
}

function compareNullableMarketCap(left: number | null, right: number | null, order: MarketSortOrder): number {
  if (left === null && right === null) return 0;
  if (left === null) return 1;
  if (right === null) return -1;
  return compareWithOrder(left, right, order);
}

export function sortMarketItems(items: MarketListItem[], sortKey: MarketSortKey, sortOrder: MarketSortOrder): MarketListItem[] {
  return [...items].sort((leftItem, rightItem) => {
    switch (sortKey) {
      case "symbol": {
        return sortOrder === "asc"
          ? leftItem.symbol.localeCompare(rightItem.symbol)
          : rightItem.symbol.localeCompare(leftItem.symbol);
      }
      case "price":
        return compareWithOrder(leftItem.price, rightItem.price, sortOrder);
      case "change24h":
        return compareWithOrder(leftItem.change24h, rightItem.change24h, sortOrder);
      case "volume24h":
        return compareWithOrder(leftItem.volume24h, rightItem.volume24h, sortOrder);
      case "marketCap":
        return compareNullableMarketCap(leftItem.marketCap, rightItem.marketCap, sortOrder);
      default:
        return 0;
    }
  });
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function paginateMarketItems(items: MarketListItem[], page: number, pageSize: number): PaginatedMarketResult {
  const safePageSize = Math.max(1, pageSize);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = clamp(page, 1, totalPages);

  const start = (currentPage - 1) * safePageSize;
  const end = start + safePageSize;

  return {
    pageData: items.slice(start, end),
    total,
    totalPages,
    currentPage
  };
}
