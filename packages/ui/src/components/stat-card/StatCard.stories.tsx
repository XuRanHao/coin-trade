import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "Components/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
指标卡片组件，用于展示关键指标名称和值（如成交量、价格、涨跌幅）。

对外 API：
- label: 指标名称。
- value: 指标值文本。
`
      }
    }
  },
  argTypes: {
    label: { description: "指标名称。", control: "text" },
    value: { description: "指标值文本。", control: "text" }
  },
  args: {
    label: "24h Volume",
    value: "$2.13B"
  }
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {};
