import type { Meta, StoryObj } from "@storybook/react";
import { PriceChart } from "./PriceChart";

const meta: Meta<typeof PriceChart> = {
  title: "Components/PriceChart",
  component: PriceChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
价格走势图组件占位实现，接收时间序列价格点用于后续真实图表渲染。

对外 API：
- points: 价格点数组，格式为 { time, value }[]。
`
      }
    }
  },
  argTypes: {
    points: {
      description: "价格时间序列数据。",
      control: "object"
    }
  },
  args: {
    points: [
      { time: 1, value: 66200 },
      { time: 2, value: 66450 },
      { time: 3, value: 65980 },
      { time: 4, value: 66820 }
    ]
  }
};

export default meta;
type Story = StoryObj<typeof PriceChart>;

export const Default: Story = {};
export const Empty: Story = { args: { points: [] } };
