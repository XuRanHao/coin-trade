import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LanguageSwitcher, type LanguageValue } from "./LanguageSwitcher";

function Demo() {
  const [value, setValue] = useState<LanguageValue>("zh");
  return <LanguageSwitcher value={value} onChange={setValue} />;
}

const meta: Meta<typeof LanguageSwitcher> = {
  title: "Components/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于中英文切换的轻量开关组件，适合放在应用头部工具栏。

对外 API：
- value: 当前语言值（zh/en）。
- onChange: 语言切换回调。
`
      }
    }
  },
  argTypes: {
    value: { description: "当前语言值。", control: false },
    onChange: { description: "语言变更回调。", control: false }
  }
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {
  render: () => <Demo />
};
