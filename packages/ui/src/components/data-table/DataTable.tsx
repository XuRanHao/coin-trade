import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import { useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

export type DataTableSortOrder = "asc" | "desc";
export type DataTableVariant = "default" | "binance";

// 中文注释：表格列配置定义。
export interface DataTableColumn<T> {
  key: string;
  title: ReactNode;
  align?: "left" | "center" | "right";
  width?: number | string;
  sortable?: boolean;
  sortKey?: string;
  render: (row: T, rowIndex: number) => ReactNode;
}

// 中文注释：表格组件对外参数定义。
export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T, rowIndex: number) => string;
  empty?: ReactNode;
  sortKey?: string;
  sortOrder?: DataTableSortOrder;
  onSortChange?: (sortKey: string, sortOrder: DataTableSortOrder) => void;
  onRowClick?: (row: T, rowIndex: number) => void;
  variant?: DataTableVariant;
}

function toTextAlign(align: DataTableColumn<unknown>["align"]): CSSProperties["textAlign"] {
  if (align === "center") return "center";
  if (align === "right") return "right";
  return "left";
}

function resolveNextSortOrder(active: boolean, currentOrder: DataTableSortOrder | undefined): DataTableSortOrder {
  if (!active) return "desc";
  return currentOrder === "asc" ? "desc" : "asc";
}

function renderSortIndicator(active: boolean, order: DataTableSortOrder | undefined): string {
  if (!active) return "SORT";
  return order === "asc" ? "ASC" : "DESC";
}

function createRowKeyHandler<T>(
  row: T,
  rowIndex: number,
  onRowClick: ((row: T, rowIndex: number) => void) | undefined
) {
  return (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (!onRowClick) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onRowClick(row, rowIndex);
  };
}

// 中文注释：通用数据表格，支持受控排序和可选整行交互。
export function DataTable<T>({
  data,
  columns,
  rowKey,
  empty,
  sortKey,
  sortOrder,
  onSortChange,
  onRowClick,
  variant = "default"
}: DataTableProps<T>) {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return <>{empty ?? null}</>;
  }

  const isBinance = variant === "binance";
  const isRowInteractive = Boolean(onRowClick);

  return (
    <div
      data-cp-variant={variant}
      style={{
        overflowX: "auto",
        border: isBinance ? "none" : `1px solid ${colors.borderSubtle}`,
        borderRadius: isBinance ? 0 : radius.md,
        background: isBinance ? "transparent" : colors.surfaceSecondary
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: typography.fontFamily
        }}
      >
        <thead>
          <tr
            style={{
              background: colors.surfaceTertiary
            }}
          >
            {columns.map((column) => {
              const resolvedSortKey = column.sortKey ?? column.key;
              const sortable = Boolean(column.sortable && onSortChange);
              const active = sortable && sortKey === resolvedSortKey;
              const indicator = renderSortIndicator(active, sortOrder);

              return (
                <th
                  key={column.key}
                  style={{
                    color: colors.textSecondary,
                    fontSize: typography.size.xs,
                    fontWeight: 500,
                    padding: `${spacing.md}px ${spacing.lg}px`,
                    textAlign: toTextAlign(column.align),
                    width: column.width,
                    borderBottom: isBinance ? "none" : `1px solid ${colors.borderSubtle}`,
                    whiteSpace: "nowrap"
                  }}
                >
                  {sortable ? (
                    <button
                      type="button"
                      onClick={() => onSortChange?.(resolvedSortKey, resolveNextSortOrder(active, sortOrder))}
                      style={{
                        width: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: column.align === "right" ? "flex-end" : column.align === "center" ? "center" : "flex-start",
                        gap: spacing.xs,
                        border: "none",
                        background: "transparent",
                        color: active ? colors.textPrimary : colors.textSecondary,
                        cursor: "pointer",
                        fontFamily: typography.fontFamily,
                        fontSize: typography.size.xs,
                        fontWeight: active ? 600 : 500,
                        padding: 0
                      }}
                    >
                      <span>{column.title}</span>
                      <span
                        style={{
                          fontSize: 10,
                          letterSpacing: 0.4
                        }}
                      >
                        {indicator}
                      </span>
                    </button>
                  ) : (
                    column.title
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const activeHover = hoveredRowIndex === rowIndex;

            return (
              <tr
                key={rowKey(row, rowIndex)}
                onClick={() => onRowClick?.(row, rowIndex)}
                onKeyDown={createRowKeyHandler(row, rowIndex, onRowClick)}
                onMouseMove={() => {
                  if (isBinance) setHoveredRowIndex(rowIndex);
                }}
                onMouseLeave={() => {
                  if (!isBinance) return;
                  setHoveredRowIndex(null);
                }}
                role={isRowInteractive ? "button" : undefined}
                tabIndex={isRowInteractive ? 0 : undefined}
                data-cp-hovered={isBinance && activeHover ? "true" : undefined}
                style={{
                  cursor: isRowInteractive ? "pointer" : "default",
                  background: isBinance && activeHover ? colors.surfaceTertiary : "transparent",
                  transition: "background-color 0.16s ease"
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      padding: `${spacing.md}px ${spacing.lg}px`,
                      borderTop: isBinance ? "none" : `1px solid ${colors.borderSubtle}`,
                      color: colors.textPrimary,
                      textAlign: toTextAlign(column.align),
                      fontSize: typography.size.sm
                    }}
                  >
                    {column.render(row, rowIndex)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
