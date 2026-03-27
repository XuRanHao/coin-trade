import { colors, radius, spacing, typography } from "@coin-platform/tokens";

export interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
}

type PageToken = number | "ellipsis";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getPageTokens(totalPages: number, currentPage: number): PageToken[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const tokens: PageToken[] = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    tokens.push("ellipsis");
  }

  for (let page = start; page <= end; page += 1) {
    tokens.push(page);
  }

  if (end < totalPages - 1) {
    tokens.push("ellipsis");
  }

  tokens.push(totalPages);
  return tokens;
}

// 中文注释：通用分页组件，支持上一页/下一页和页码跳转。
export function Pagination({ current, total, pageSize, onPageChange, prevLabel = "PREV", nextLabel = "NEXT" }: PaginationProps) {
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));

  if (totalPages <= 1) {
    return null;
  }

  const currentPage = clamp(current, 1, totalPages);
  const pageTokens = getPageTokens(totalPages, currentPage);

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.xs
      }}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        style={{
          minWidth: 34,
          height: 34,
          padding: `0 ${spacing.sm}px`,
          borderRadius: radius.sm,
          border: `1px solid ${colors.borderSubtle}`,
          background: "transparent",
          color: colors.textSecondary,
          cursor: currentPage <= 1 ? "not-allowed" : "pointer",
          opacity: currentPage <= 1 ? 0.45 : 1,
          fontFamily: typography.fontFamily
        }}
      >
        {prevLabel}
      </button>

      {pageTokens.map((token, index) => {
        if (token === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} style={{ color: colors.textSecondary, padding: `0 ${spacing.xs}px` }}>
              ...
            </span>
          );
        }

        const active = token === currentPage;
        return (
          <button
            key={token}
            type="button"
            onClick={() => onPageChange(token)}
            aria-label={`Page ${token}`}
            style={{
              minWidth: 34,
              height: 34,
              borderRadius: radius.sm,
              border: `1px solid ${active ? colors.accent : colors.borderSubtle}`,
              background: active ? colors.surfaceTertiary : "transparent",
              color: active ? colors.textPrimary : colors.textSecondary,
              cursor: "pointer",
              padding: `0 ${spacing.sm}px`,
              fontFamily: typography.fontFamily,
              fontSize: typography.size.sm
            }}
          >
            {token}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        style={{
          minWidth: 34,
          height: 34,
          padding: `0 ${spacing.sm}px`,
          borderRadius: radius.sm,
          border: `1px solid ${colors.borderSubtle}`,
          background: "transparent",
          color: colors.textSecondary,
          cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
          opacity: currentPage >= totalPages ? 0.45 : 1,
          fontFamily: typography.fontFamily
        }}
      >
        {nextLabel}
      </button>
    </nav>
  );
}
