import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于列表/图表无数据或异常情况下的统一空状态展示，支持标题、说明和动作按钮区域。

对外 API：
- title: 空态主标题。
- description: 说明文案（可选）。
- action: 操作区节点（可选）。
`
      }
    }
  },
  argTypes: {
    title: { description: "空态主标题。", control: "text" },
    description: { description: "补充说明文案。", control: "text" },
    action: { description: "操作区内容，例如按钮。", control: false }
  },
  args: {
    title: "No market data",
    description: "Please retry or change filters."
  }
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
export const WithAction: Story = {
  args: {
    action: <button type="button">Reload</button>
  }
};
