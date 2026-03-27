import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于行情页、列表页等场景的关键词搜索输入，内置清空按钮交互。

对外 API：
- value: 当前输入值（受控）
- onChange: 输入变更回调
- placeholder: 占位提示文案
- onClear: 点击清空按钮时触发
- disabled: 是否禁用
`
      }
    }
  },
  argTypes: {
    value: { control: false, description: "当前输入值（受控）" },
    onChange: { control: false, description: "输入变化时回调" },
    placeholder: { control: "text", description: "占位符文本" },
    onClear: { control: false, description: "清空时触发" },
    disabled: { control: "boolean", description: "禁用状态" }
  }
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

function SearchInputDemo({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue);

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder="Search symbol or name..."
      style={{ maxWidth: 360 }}
    />
  );
}

export const Default: Story = {
  render: () => <SearchInputDemo initialValue="" />
};

export const WithValue: Story = {
  render: () => <SearchInputDemo initialValue="BTC" />
};
