import { colors, spacing, typography } from "@coin-platform/tokens";
import { Card, DataTable, type DataTableColumn, EmptyState, PriceChange } from "@coin-platform/ui";
import { formatPrice, formatVolume } from "@coin-platform/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMarketSnapshot } from "@/shared/api/binance";
import type { MarketTicker } from "@/features/market/types";

const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"];

const columns: DataTableColumn<MarketTicker>[] = [
  {
    key: "symbol",
    title: "Symbol",
    render: (row) => (
      <Link to={`/asset/${row.symbol}`} style={{ color: colors.textPrimary, fontWeight: 700, textDecoration: "none" }}>
        {row.symbol}
      </Link>
    )
  },
  {
    key: "price",
    title: "Price",
    align: "right",
    render: (row) => formatPrice(row.price)
  },
  {
    key: "change24h",
    title: "24h",
    align: "right",
    render: (row) => <PriceChange value={row.changePercent24h} />
  },
  {
    key: "volume24h",
    title: "Volume 24h",
    align: "right",
    render: (row) => formatVolume(row.volume24h)
  }
];

export function MarketPage() {
  const snapshotQuery = useQuery({
    queryKey: ["market-snapshot", symbols],
    queryFn: () => fetchMarketSnapshot(symbols),
    staleTime: 30_000
  });

  return (
    <section style={{ display: "grid", gap: spacing.xl }}>
      <header>
        <h1
          style={{
            margin: 0,
            color: colors.textPrimary,
            fontFamily: typography.fontFamily
          }}
        >
          Market Snapshot
        </h1>
        <p style={{ marginTop: spacing.sm, color: colors.textSecondary }}>Real-time market data from Binance public API.</p>
      </header>

      <Card>
        {snapshotQuery.isLoading ? (
          <p style={{ color: colors.textSecondary }}>Loading market data...</p>
        ) : snapshotQuery.isError ? (
          <EmptyState title="Failed to load market data" description="Please retry or check your network access." />
        ) : (
          <DataTable
            data={snapshotQuery.data ?? []}
            columns={columns}
            rowKey={(row) => row.symbol}
            empty={<EmptyState title="No market data" description="No symbols available." />}
          />
        )}
      </Card>
    </section>
  );
}
