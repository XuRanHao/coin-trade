import { colors, spacing, typography } from "@coin-platform/tokens";
import { Badge, ChartPanel, EmptyState, StatCard } from "@coin-platform/ui";
import { formatPercentage, formatPrice, formatVolume } from "@coin-platform/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { createMockPrediction } from "@/features/prediction/mock";
import { fetchKlines, fetchTicker24h } from "@/shared/api/binance";
import { useAppPreferences } from "@/shared/preferences/AppPreferencesProvider";
import { PriceChartWidget } from "@/widgets/price-chart/PriceChartWidget";

// 中文注释：核心逻辑说明。 (AssetDetailPage)
export function AssetDetailPage() {
  const { t } = useAppPreferences();
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
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${colors.borderSubtle}`,
          paddingBottom: spacing.md
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: colors.textPrimary, fontFamily: typography.fontFamily, fontSize: 34 }}>{symbol}</h1>
          <p style={{ marginTop: spacing.sm, color: colors.textSecondary }}>{t("assetSubtitle")}</p>
        </div>
        <Badge tone="warning">{t("badgeAIForecast")}</Badge>
      </header>

      {tickerQuery.data ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: spacing.md }}>
          <StatCard label={t("statLastPrice")} value={formatPrice(tickerQuery.data.price)} />
          <StatCard label={t("stat24hChange")} value={formatPercentage(tickerQuery.data.changePercent24h)} />
          <StatCard label={t("stat24hVolume")} value={formatVolume(tickerQuery.data.volume24h)} />
        </div>
      ) : null}

      <ChartPanel title={t("chartTitle")} extra={<span>{t("intervalHour")}</span>}>
        {klineQuery.isLoading ? (
          <p style={{ color: colors.textSecondary }}>{t("loadingChart")}</p>
        ) : klineQuery.isError || !klineQuery.data?.length ? (
          <EmptyState title={t("emptyChartTitle")} description={t("emptyChartDesc")} />
        ) : (
          <PriceChartWidget points={klineQuery.data} predictions={prediction?.scenarios} />
        )}
      </ChartPanel>
    </section>
  );
}
