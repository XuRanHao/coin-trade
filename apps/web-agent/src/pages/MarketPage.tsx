import { colors, spacing, typography } from "@coin-platform/tokens";
import { useQuery } from "@tanstack/react-query";
import { fetchUSDTMarketList } from "@/shared/api/binance";
import { useAppPreferences } from "@/shared/preferences/AppPreferencesProvider";
import { MarketTable } from "@/widgets/market-table/MarketTable";

// 中文注释：市场主页，聚焦全量 USDT 现货对的行情查询与排序。
export function MarketPage() {
  const { t } = useAppPreferences();

  const marketQuery = useQuery({
    queryKey: ["market-list", "usdt"],
    queryFn: fetchUSDTMarketList,
    staleTime: 30_000
  });

  return (
    <section style={{ display: "grid", gap: spacing.xl }}>
      <header style={{ display: "grid", gap: spacing.sm }}>
        <h1
          style={{
            margin: 0,
            color: colors.textPrimary,
            fontFamily: typography.fontFamily,
            fontSize: 36,
            fontWeight: 700
          }}
        >
          {t("pageOverviewTitle")}
        </h1>
        <p style={{ margin: 0, color: colors.textSecondary }}>{t("pageOverviewDesc")}</p>
      </header>

      <MarketTable
        rows={marketQuery.data ?? []}
        isLoading={marketQuery.isLoading}
        isError={marketQuery.isError}
      />
    </section>
  );
}
