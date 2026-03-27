import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于币种搜索输入场景，当前版本是 Input 的轻量封装，保留 options 作为后续下拉联想能力的对外契约。

对外 API：
- options: 联想候选项列表（预留给后续下拉渲染）。
- placeholder/value/defaultValue: 输入展示与初始值。
- onChange: 输入变化回调。
- disabled: 禁用输入状态。
`
      }
    }
  },
  argTypes: {
    options: {
      description: "联想候选项列表，格式为 { key, label }[]。",
      control: "object"
    },
    placeholder: {
      description: "输入框占位文本。",
      control: "text"
    },
    value: {
      description: "受控输入值。",
      control: "text"
    },
    defaultValue: {
      description: "非受控默认值。",
      control: "text"
    },
    disabled: {
      description: "是否禁用输入。",
      control: "boolean"
    }
  },
  args: {
    placeholder: "Search symbol...",
    options: [
      { key: "BTCUSDT", label: "BTCUSDT" },
      { key: "ETHUSDT", label: "ETHUSDT" },
      { key: "SOLUSDT", label: "SOLUSDT" }
    ]
  }
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "ETHUSDT"
  }
};
