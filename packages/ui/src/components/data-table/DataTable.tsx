import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import type { CSSProperties, ReactNode } from "react";

export interface DataTableColumn<T> {
  key: string;
  title: ReactNode;
  align?: "left" | "center" | "right";
  width?: number | string;
  render: (row: T, rowIndex: number) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T, rowIndex: number) => string;
  empty?: ReactNode;
}

function toTextAlign(align: DataTableColumn<unknown>["align"]): CSSProperties["textAlign"] {
  if (align === "center") return "center";
  if (align === "right") return "right";
  return "left";
}

export function DataTable<T>({ data, columns, rowKey, empty }: DataTableProps<T>) {
  if (data.length === 0) {
    return <>{empty ?? null}</>;
  }

  return (
    <div
      style={{
        overflowX: "auto",
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.lg
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
          <tr style={{ background: colors.surfacePrimary }}>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  color: colors.textSecondary,
                  fontSize: typography.size.xs,
                  fontWeight: 600,
                  letterSpacing: 0.6,
                  padding: `${spacing.md}px ${spacing.lg}px`,
                  textAlign: toTextAlign(column.align),
                  width: column.width
                }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowKey(row, rowIndex)}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: `${spacing.md}px ${spacing.lg}px`,
                    borderTop: `1px solid ${colors.borderSubtle}`,
                    color: colors.textPrimary,
                    textAlign: toTextAlign(column.align)
                  }}
                >
                  {column.render(row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
