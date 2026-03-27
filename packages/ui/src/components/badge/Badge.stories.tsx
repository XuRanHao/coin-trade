import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于展示状态标签或场景标签，例如预测情景（Bullish/Neutral/Bearish）与业务状态提示。

对外 API：
- tone: 视觉语义风格（default/success/warning/danger）。
- children: 标签文本或自定义内容。
`
      }
    }
  },
  argTypes: {
    tone: {
      description: "标签风格语义。",
      control: "radio",
      options: ["default", "success", "warning", "danger"]
    },
    children: {
      description: "标签内容。",
      control: "text"
    }
  },
  args: {
    children: "Neutral",
    tone: "default"
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Success: Story = {
  args: {
    tone: "success",
    children: "Bullish"
  }
};
export const Warning: Story = {
  args: {
    tone: "warning",
    children: "Neutral"
  }
};
export const Danger: Story = {
  args: {
    tone: "danger",
    children: "Bearish"
  }
};
