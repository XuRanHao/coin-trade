import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
通用内容容器组件，统一面板背景、边框、阴影与圆角，适用于信息卡、图表容器、统计模块等。

对外 API：
- children: 卡片内容。
- style/className: 扩展样式能力（继承 div 属性）。
`
      }
    }
  },
  argTypes: {
    children: {
      description: "卡片内部节点内容。",
      control: false
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <h4 style={{ margin: 0 }}>BTC/USDT</h4>
      <p style={{ margin: "8px 0 0" }}>Last Price: $68,420.12</p>
    </Card>
  )
};
