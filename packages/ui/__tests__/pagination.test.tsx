import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Pagination } from "../src/components/pagination/Pagination";

function PaginationHarness({ total, pageSize }: { total: number; pageSize: number }) {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={total} pageSize={pageSize} onPageChange={setPage} />;
}

describe("Pagination", () => {
  it("switches page by clicking page number", async () => {
    const user = userEvent.setup();
    render(<PaginationHarness total={200} pageSize={20} />);

    const prevButton = screen.getByRole("button", { name: "Previous page" });
    expect(prevButton).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(prevButton).not.toBeDisabled();
  });

  it("disables previous button on first page", () => {
    render(<Pagination current={1} total={200} pageSize={20} onPageChange={() => undefined} />);

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });
});
