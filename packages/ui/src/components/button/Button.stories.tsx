import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
统一业务按钮组件，用于交易、筛选、确认等交互动作，内置视觉风格与 loading 状态。

对外 API：
- variant: 按钮风格（primary/secondary/ghost/danger）。
- size: 按钮尺寸（sm/md/lg）。
- loading: 加载态，开启后会禁用点击并展示 Loading 文案。
- disabled: 禁用态。
- onClick: 点击回调。
- children: 按钮文本或节点内容。
`
      }
    }
  },
  argTypes: {
    variant: {
      description: "按钮风格。",
      control: "radio",
      options: ["primary", "secondary", "ghost", "danger"]
    },
    size: {
      description: "按钮尺寸。",
      control: "radio",
      options: ["sm", "md", "lg"]
    },
    loading: {
      description: "是否处于加载态。",
      control: "boolean"
    },
    disabled: {
      description: "是否禁用。",
      control: "boolean"
    },
    children: {
      description: "按钮内容。",
      control: "text"
    }
  },
  args: {
    children: "Buy BTC",
    variant: "primary",
    size: "md"
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Loading: Story = { args: { loading: true } };
