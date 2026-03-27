import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
加载占位骨架屏组件，用于请求中状态，提升页面感知性能。

对外 API：
- width: 骨架宽度（number 或 css 字符串）。
- height: 骨架高度（像素值）。
`
      }
    }
  },
  argTypes: {
    width: { description: "骨架宽度。", control: "text" },
    height: { description: "骨架高度。", control: "number" }
  },
  args: {
    width: 220,
    height: 16
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};
export const Block: Story = { args: { width: "100%", height: 80 } };
