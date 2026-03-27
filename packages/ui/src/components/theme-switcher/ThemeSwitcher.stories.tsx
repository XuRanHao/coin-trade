import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ThemeSwitcher, type ThemeValue } from "./ThemeSwitcher";

function Demo() {
  const [value, setValue] = useState<ThemeValue>("dark");
  return <ThemeSwitcher value={value} onChange={setValue} />;
}

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于明暗主题切换的开关组件，适合放在应用头部工具栏。

对外 API：
- value: 当前主题值（dark/light）。
- onChange: 主题切换回调。
`
      }
    }
  },
  argTypes: {
    value: { description: "当前主题值。", control: false },
    onChange: { description: "主题变更回调。", control: false }
  }
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  render: () => <Demo />
};
