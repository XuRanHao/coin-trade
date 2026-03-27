import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { SearchInput } from "../src/components/search-input/SearchInput";

function SearchInputHarness({ onClear }: { onClear?: () => void }) {
  const [value, setValue] = useState("");

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      onClear={onClear}
      placeholder="Search symbol"
    />
  );
}

describe("SearchInput", () => {
  it("updates input value when typing", async () => {
    const user = userEvent.setup();
    render(<SearchInputHarness />);

    const input = screen.getByPlaceholderText("Search symbol");
    await user.type(input, "BTC");

    expect(input).toHaveValue("BTC");
  });

  it("clears value and triggers onClear", async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    render(<SearchInputHarness onClear={onClear} />);

    const input = screen.getByPlaceholderText("Search symbol");
    await user.type(input, "ETH");
    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(input).toHaveValue("");
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
