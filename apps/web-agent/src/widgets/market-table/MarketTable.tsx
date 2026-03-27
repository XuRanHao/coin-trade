import { colors, spacing } from "@coin-platform/tokens";
import {
  Card,
  DataTable,
  type DataTableColumn,
  type DataTableSortOrder,
  EmptyState,
  Pagination,
  PriceChange,
  SearchInput,
  TokenIdentity
} from "@coin-platform/ui";
import { formatMarketCap, formatPrice, formatVolume } from "@coin-platform/utils";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  filterMarketItems,
  isMarketSortKey,
  paginateMarketItems,
  type MarketSortKey,
  type MarketSortOrder,
  sortMarketItems
} from "@/features/market/market-list";
import type { MarketListItem } from "@/features/market/types";
import { useAppPreferences } from "@/shared/preferences/AppPreferencesProvider";

const PAGE_SIZE = 20;

interface MarketTableProps {
  rows: MarketListItem[];
  isLoading: boolean;
  isError: boolean;
}

// 中文注释：市场总览表格业务组件，包含查询、排序、分页三个交互层状态。
export function MarketTable({ rows, isLoading, isError }: MarketTableProps) {
  const { t } = useAppPreferences();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<MarketSortKey>("marketCap");
  const [sortOrder, setSortOrder] = useState<MarketSortOrder>("desc");
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => filterMarketItems(rows, query), [rows, query]);
  const sortedRows = useMemo(() => sortMarketItems(filteredRows, sortKey, sortOrder), [filteredRows, sortKey, sortOrder]);
  const paginatedRows = useMemo(() => paginateMarketItems(sortedRows, page, PAGE_SIZE), [sortedRows, page]);

  const columns = useMemo<DataTableColumn<MarketListItem>[]>(
    () => [
      {
        key: "symbol",
        sortKey: "symbol",
        title: t("tableName"),
        sortable: true,
        render: (row) => (
          <TokenIdentity
            symbol={row.baseAsset}
            name={row.name}
            iconUrl={row.iconUrl}
          />
        )
      },
      {
        key: "price",
        title: t("tablePrice"),
        sortKey: "price",
        sortable: true,
        align: "right",
        render: (row) => formatPrice(row.price)
      },
      {
        key: "change24h",
        title: t("tableChange24h"),
        sortKey: "change24h",
        sortable: true,
        align: "right",
        render: (row) => <PriceChange value={row.change24h} />
      },
      {
        key: "volume24h",
        title: t("tableVolume24h"),
        sortKey: "volume24h",
        sortable: true,
        align: "right",
        render: (row) => `$${formatVolume(row.volume24h)}`
      },
      {
        key: "marketCap",
        title: t("tableMarketCap"),
        sortKey: "marketCap",
        sortable: true,
        align: "right",
        render: (row) => (row.marketCap === null ? "--" : formatMarketCap(row.marketCap))
      }
    ],
    [t]
  );

  const handleSortChange = (nextSortKey: string, nextSortOrder: DataTableSortOrder) => {
    if (!isMarketSortKey(nextSortKey)) {
      return;
    }

    setSortKey(nextSortKey);
    setSortOrder(nextSortOrder);
    setPage(1);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const emptyTitle = query.trim() ? t("emptySearchTitle") : t("emptyMarketTitle");
  const emptyDescription = query.trim() ? t("emptySearchDesc") : t("emptyMarketDesc");

  return (
    <Card style={{ padding: spacing.xl, display: "grid", gap: spacing.lg }}>
      <div
        style={{
          display: "flex",
          gap: spacing.md,
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap"
        }}
      >
        <div style={{ display: "grid", gap: spacing.xs }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{t("marketAllTitle")}</h2>
          <p style={{ margin: 0, color: colors.textSecondary }}>{t("marketAllDesc")}</p>
          <p style={{ margin: 0, color: colors.textSecondary }}>
            {t("marketResultLabel")}: {paginatedRows.total}
          </p>
        </div>

        <SearchInput
          value={query}
          onChange={handleQueryChange}
          placeholder={t("marketSearchPlaceholder")}
          style={{ width: 320, maxWidth: "100%" }}
        />
      </div>

      {isLoading ? (
        <p style={{ color: colors.textSecondary }}>{t("loadingMarket")}</p>
      ) : isError ? (
        <EmptyState title={t("errorMarketTitle")} description={t("errorMarketDesc")} />
      ) : (
        <div style={{ display: "grid", gap: spacing.md }}>
          <DataTable<MarketListItem>
            data={paginatedRows.pageData}
            columns={columns}
            rowKey={(row) => row.symbol}
            empty={<EmptyState title={emptyTitle} description={emptyDescription} />}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            variant="binance"
            onRowClick={(row) => navigate(`/asset/${row.symbol}`)}
          />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              current={paginatedRows.currentPage}
              total={paginatedRows.total}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              prevLabel={t("paginationPrev")}
              nextLabel={t("paginationNext")}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
