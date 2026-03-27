import type { Meta, StoryObj } from "@storybook/react";
import { CandlestickChart } from "./CandlestickChart";

const meta: Meta<typeof CandlestickChart> = {
  title: "Components/CandlestickChart",
  component: CandlestickChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
K 线图组件占位实现，用于展示 OHLC 蜡烛数据。当前版本为占位渲染，后续可替换为真实图表实现。

对外 API：
- candles: K 线数据数组，元素格式为 { time, open, high, low, close }。
`
      }
    }
  },
  argTypes: {
    candles: {
      description: "K 线数据列表。",
      control: "object"
    }
  },
  args: {
    candles: [
      { time: 1, open: 65000, high: 66200, low: 64500, close: 65800 },
      { time: 2, open: 65800, high: 66400, low: 65100, close: 65400 },
      { time: 3, open: 65400, high: 67100, low: 65200, close: 66800 }
    ]
  }
};

export default meta;
type Story = StoryObj<typeof CandlestickChart>;

export const Default: Story = {};
export const Empty: Story = { args: { candles: [] } };
