import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
基础输入框组件，统一输入高度、边框与主题色，作为搜索框和表单输入的基础能力。

对外 API：
- placeholder: 占位文案。
- value/defaultValue: 受控/非受控输入值。
- onChange: 输入变化回调。
- disabled: 禁用状态。
`
      }
    }
  },
  argTypes: {
    placeholder: { description: "输入框占位文案。", control: "text" },
    value: { description: "受控输入值。", control: "text" },
    defaultValue: { description: "非受控默认值。", control: "text" },
    disabled: { description: "是否禁用。", control: "boolean" }
  },
  args: {
    placeholder: "Search symbol..."
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithValue: Story = {
  args: {
    value: "BTCUSDT"
  }
};
