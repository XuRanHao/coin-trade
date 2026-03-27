import { colors, spacing, typography } from "@coin-platform/tokens";
import { Badge, ChartPanel, EmptyState, StatCard } from "@coin-platform/ui";
import { formatPercentage, formatPrice, formatVolume } from "@coin-platform/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchKlines, fetchTicker24h } from "@/shared/api/binance";
import { createMockPrediction } from "@/features/prediction/mock";
import { PriceChartWidget } from "@/widgets/price-chart/PriceChartWidget";

export function AssetDetailPage() {
  const params = useParams();
  const symbol = params.symbol ?? "BTCUSDT";

  const tickerQuery = useQuery({
    queryKey: ["ticker", symbol],
    queryFn: () => fetchTicker24h(symbol),
    staleTime: 30_000
  });

  const klineQuery = useQuery({
    queryKey: ["klines", symbol],
    queryFn: () => fetchKlines(symbol, "1h", 120),
    staleTime: 30_000
  });

  const prediction = useMemo(() => {
    if (!klineQuery.data?.length) return null;
    return createMockPrediction(symbol, klineQuery.data);
  }, [klineQuery.data, symbol]);

  return (
    <section style={{ display: "grid", gap: spacing.xl }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, color: colors.textPrimary, fontFamily: typography.fontFamily }}>{symbol}</h1>
          <p style={{ marginTop: spacing.sm, color: colors.textSecondary }}>
            Price timeline + prediction overlay (agent-ready protocol placeholder).
          </p>
        </div>
        <Badge tone="warning">MVP</Badge>
      </header>

      {tickerQuery.data ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: spacing.md }}>
          <StatCard label="Last Price" value={formatPrice(tickerQuery.data.price)} />
          <StatCard label="24h Change" value={formatPercentage(tickerQuery.data.changePercent24h)} />
          <StatCard label="24h Volume" value={formatVolume(tickerQuery.data.volume24h)} />
        </div>
      ) : null}

      <ChartPanel
        title="Price + Prediction"
        extra={<span style={{ color: colors.textSecondary, fontSize: typography.size.sm }}>Interval: 1H</span>}
      >
        {klineQuery.isLoading ? (
          <p style={{ color: colors.textSecondary }}>Loading chart...</p>
        ) : klineQuery.isError || !klineQuery.data?.length ? (
          <EmptyState title="No chart data" description="Cannot load this symbol right now." />
        ) : (
          <PriceChartWidget points={klineQuery.data} predictions={prediction?.scenarios} />
        )}
      </ChartPanel>
    </section>
  );
}
