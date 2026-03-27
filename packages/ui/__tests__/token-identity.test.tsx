import { fireEvent, render, screen } from "@testing-library/react";
import { TokenIdentity } from "../src/components/token-identity/TokenIdentity";

describe("TokenIdentity", () => {
  it("renders image when iconUrl is available", () => {
    render(<TokenIdentity symbol="BTC" name="Bitcoin" iconUrl="https://cdn.a/btc.png" />);

    expect(screen.getByRole("img", { name: "BTC icon" })).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  it("switches to jsDelivr icon when iconUrl fails", () => {
    render(<TokenIdentity symbol="ETH" name="Ethereum" iconUrl="https://cdn.a/eth.png" />);

    const image = screen.getByRole("img", { name: "ETH icon" }) as HTMLImageElement;
    fireEvent.error(image);

    expect(screen.getByRole("img", { name: "ETH icon" })).toHaveAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/128/color/eth.png"
    );
  });

  it("falls back to letter when all icon candidates fail", () => {
    render(<TokenIdentity symbol="TST" name="Test Coin" iconUrl="https://cdn.a/tst.png" />);

    const firstImage = screen.getByRole("img", { name: "TST icon" });
    fireEvent.error(firstImage);

    const secondImage = screen.getByRole("img", { name: "TST icon" });
    fireEvent.error(secondImage);

    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("hides duplicated name when name equals symbol", () => {
    render(<TokenIdentity symbol="ETH" name="ETH" iconUrl={null} />);

    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(screen.getAllByText("ETH")).toHaveLength(1);
  });
});
