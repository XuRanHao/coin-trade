import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
提示信息组件，为任意子元素提供悬浮提示说明，适合解释指标含义或操作提示。

对外 API：
- content: 悬浮提示文本。
- children: 被包裹的触发元素。
`
      }
    }
  },
  argTypes: {
    content: { description: "悬浮提示文本。", control: "text" },
    children: { description: "触发提示的子元素。", control: false }
  },
  args: {
    content: "Predicted probability: 42%"
  }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <button type="button">Hover me</button>
    </Tooltip>
  )
};
