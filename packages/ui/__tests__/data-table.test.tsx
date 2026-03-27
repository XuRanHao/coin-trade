import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, type DataTableColumn } from "../src/components/data-table/DataTable";

type Row = {
  symbol: string;
  price: number;
};

const data: Row[] = [
  { symbol: "BTCUSDT", price: 68000 },
  { symbol: "ETHUSDT", price: 3500 }
];

const columns: DataTableColumn<Row>[] = [
  {
    key: "symbol",
    title: "Symbol",
    sortable: true,
    render: (row) => row.symbol
  },
  {
    key: "price",
    title: "Price",
    sortable: true,
    align: "right",
    render: (row) => row.price.toString()
  }
];

describe("DataTable", () => {
  it("toggles sort order when clicking active sort column", async () => {
    const user = userEvent.setup();
    const onSortChange = jest.fn();

    render(
      <DataTable<Row>
        data={data}
        columns={columns}
        rowKey={(row) => row.symbol}
        sortKey="price"
        sortOrder="desc"
        onSortChange={onSortChange}
      />
    );

    await user.click(screen.getByRole("button", { name: /Price/i }));
    expect(onSortChange).toHaveBeenCalledWith("price", "asc");
  });

  it("uses descending order when activating a new sort column", async () => {
    const user = userEvent.setup();
    const onSortChange = jest.fn();

    render(
      <DataTable<Row>
        data={data}
        columns={columns}
        rowKey={(row) => row.symbol}
        sortKey="price"
        sortOrder="asc"
        onSortChange={onSortChange}
      />
    );

    await user.click(screen.getByRole("button", { name: /Symbol/i }));
    expect(onSortChange).toHaveBeenCalledWith("symbol", "desc");
  });

  it("calls onRowClick when clicking row", async () => {
    const user = userEvent.setup();
    const onRowClick = jest.fn();

    render(
      <DataTable<Row>
        data={data}
        columns={columns}
        rowKey={(row) => row.symbol}
        onRowClick={onRowClick}
      />
    );

    await user.click(screen.getByText("BTCUSDT"));
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it("changes row background on hover in binance variant", async () => {
    render(
      <DataTable<Row>
        data={data}
        columns={columns}
        rowKey={(row) => row.symbol}
        variant="binance"
      />
    );

    const row = screen.getByText("BTCUSDT").closest("tr");
    expect(row).not.toBeNull();
    fireEvent.mouseMove(row!);

    await waitFor(() => {
      expect(row).toHaveAttribute("data-cp-hovered", "true");
    });
  });
});
