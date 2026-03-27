import type { Meta, StoryObj } from "@storybook/react";
import { PredictionOverlay } from "./PredictionOverlay";

const meta: Meta<typeof PredictionOverlay> = {
  title: "Components/PredictionOverlay",
  component: PredictionOverlay,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于在价格图上叠加多条预测情景线（看涨/中性/看跌）。当前为占位实现，保留线条输入协议。

对外 API：
- lines: 预测线数组，格式为 { id, values }[]。
`
      }
    }
  },
  argTypes: {
    lines: { description: "预测线数据列表。", control: "object" }
  },
  args: {
    lines: [
      { id: "bull", values: [101, 104, 110, 114] },
      { id: "neutral", values: [101, 102, 103, 103] },
      { id: "bear", values: [101, 99, 96, 92] }
    ]
  }
};

export default meta;
type Story = StoryObj<typeof PredictionOverlay>;

export const Default: Story = {};
export const Empty: Story = { args: { lines: [] } };
