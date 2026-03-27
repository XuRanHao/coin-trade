import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn, type DataTableSortOrder } from "./DataTable";

type Row = {
  symbol: string;
  price: number;
  change: number;
};

const rows: Row[] = [
  { symbol: "BTCUSDT", price: 68420.12, change: 1.24 },
  { symbol: "ETHUSDT", price: 3540.08, change: -0.56 },
  { symbol: "SOLUSDT", price: 172.44, change: 3.82 }
];

const columns: DataTableColumn<Row>[] = [
  { key: "symbol", title: "Symbol", sortable: true, render: (row) => row.symbol },
  { key: "price", title: "Price", align: "right", sortable: true, render: (row) => `$${row.price.toFixed(2)}` },
  { key: "change", title: "24h", align: "right", sortable: true, render: (row) => `${row.change.toFixed(2)}%` }
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于展示结构化数据，支持列排序、整行点击和可切换视觉样式（default/binance）。

对外 API：
- data / columns / rowKey / empty: 表格基础渲染配置
- sortKey / sortOrder / onSortChange: 受控排序能力
- onRowClick: 整行点击回调
- variant: 视觉风格，支持 default 与 binance
`
      }
    }
  },
  argTypes: {
    data: { control: false, description: "表格数据" },
    columns: { control: false, description: "列配置数组" },
    rowKey: { control: false, description: "行 key 生成函数" },
    empty: { control: false, description: "空态内容" },
    sortKey: { control: false, description: "当前排序字段（受控）" },
    sortOrder: { control: false, description: "当前排序方向（受控）" },
    onSortChange: { control: false, description: "排序点击回调" },
    onRowClick: { control: false, description: "行点击回调" },
    variant: { control: "radio", options: ["default", "binance"], description: "表格视觉变体" }
  }
};

export default meta;
type Story = StoryObj<typeof DataTable>;

function SortableDataTableDemo() {
  const [sortKey, setSortKey] = useState("price");
  const [sortOrder, setSortOrder] = useState<DataTableSortOrder>("desc");

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const left = a[sortKey as keyof Row];
      const right = b[sortKey as keyof Row];

      if (typeof left === "number" && typeof right === "number") {
        return sortOrder === "asc" ? left - right : right - left;
      }

      const leftText = String(left);
      const rightText = String(right);
      return sortOrder === "asc" ? leftText.localeCompare(rightText) : rightText.localeCompare(leftText);
    });
  }, [sortKey, sortOrder]);

  return (
    <DataTable<Row>
      data={sortedRows}
      columns={columns}
      rowKey={(row) => row.symbol}
      sortKey={sortKey}
      sortOrder={sortOrder}
      onSortChange={(nextSortKey, nextSortOrder) => {
        setSortKey(nextSortKey);
        setSortOrder(nextSortOrder);
      }}
      empty={<div>No Data</div>}
    />
  );
}

export const Default: Story = {
  render: () => <SortableDataTableDemo />
};

export const BinanceRowClickable: Story = {
  render: () => (
    <DataTable<Row>
      data={rows}
      columns={columns}
      rowKey={(row) => row.symbol}
      variant="binance"
      onRowClick={(row) => console.log("row click", row.symbol)}
      empty={<div>No Data</div>}
    />
  )
};

export const Empty: Story = {
  render: () => (
    <DataTable<Row>
      data={[]}
      columns={columns}
      rowKey={(row) => row.symbol}
      empty={<div>Empty State</div>}
    />
  )
};
