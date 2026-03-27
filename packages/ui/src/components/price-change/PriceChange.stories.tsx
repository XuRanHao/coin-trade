import type { Meta, StoryObj } from "@storybook/react";
import { PriceChange } from "./PriceChange";

const meta: Meta<typeof PriceChange> = {
  title: "Components/PriceChange",
  component: PriceChange,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
涨跌幅展示组件，根据正负自动切换颜色并统一格式化百分比显示。

对外 API：
- value: 涨跌幅数值（百分比语义）。
`
      }
    }
  },
  argTypes: {
    value: {
      description: "涨跌幅数值，例如 1.28 表示 +1.28%。",
      control: "number"
    }
  },
  args: {
    value: 1.28
  }
};

export default meta;
type Story = StoryObj<typeof PriceChange>;

export const Positive: Story = {};
export const Negative: Story = { args: { value: -2.04 } };
export const Flat: Story = { args: { value: 0 } };
