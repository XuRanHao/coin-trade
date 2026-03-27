import type { Meta, StoryObj } from "@storybook/react";
import { MiniTrendChart } from "./MiniTrendChart";

const meta: Meta<typeof MiniTrendChart> = {
  title: "Components/MiniTrendChart",
  component: MiniTrendChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于列表或卡片中的迷你走势展示。当前为占位实现，用于验证 API 与布局位置。

对外 API：
- values: 趋势值数组。
`
      }
    }
  },
  argTypes: {
    values: { description: "趋势数据数组。", control: "object" }
  },
  args: {
    values: [98, 101, 104, 99, 108, 112]
  }
};

export default meta;
type Story = StoryObj<typeof MiniTrendChart>;

export const Default: Story = {};
export const Empty: Story = {
  args: { values: [] }
};
