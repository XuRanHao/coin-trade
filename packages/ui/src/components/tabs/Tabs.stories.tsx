import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs } from "./Tabs";

const tabItems = [
  { label: "1H", value: "1H" },
  { label: "4H", value: "4H" },
  { label: "1D", value: "1D" }
] as const;

function TabsDemo() {
  const [value, setValue] = useState<(typeof tabItems)[number]["value"]>("1H");
  return <Tabs items={tabItems} value={value} onChange={setValue} />;
}

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
标签切换组件，用于时间周期、视图模式等离散状态的快速切换。

对外 API：
- items: 标签项数组，格式为 { label, value }[]。
- value: 当前激活值（受控）。
- onChange: 点击标签后的值变更回调。
`
      }
    }
  },
  argTypes: {
    items: { description: "可选标签项列表。", control: false },
    value: { description: "当前选中值（受控）。", control: false },
    onChange: { description: "值变更回调。", control: false }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => <TabsDemo />
};
