// 中文注释：配置说明。
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/button/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Trade</Button>);
    expect(screen.getByRole("button", { name: "Trade" })).toBeInTheDocument();
  });
});
