import type { Meta, StoryObj } from "@storybook/react";
import { TokenIdentity } from "./TokenIdentity";

const meta: Meta<typeof TokenIdentity> = {
  title: "Components/TokenIdentity",
  component: TokenIdentity,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于行情列表中统一展示币种图标、Symbol 和名称。

图标加载顺序：
- iconUrl（上游数据）
- jsDelivr cryptocurrency-icons（按 symbol）
- 字母占位

对外 API：
- symbol: 币种代码（如 BTC）
- name: 币种名称（如 Bitcoin）
- iconUrl: 图标地址，可为空
- size: 图标尺寸（默认 32）
`
      }
    }
  },
  argTypes: {
    symbol: { control: "text", description: "币种 Symbol" },
    name: { control: "text", description: "币种名称" },
    iconUrl: { control: "text", description: "币种图标 URL" },
    size: { control: "number", description: "图标尺寸" }
  }
};

export default meta;
type Story = StoryObj<typeof TokenIdentity>;

export const WithIcon: Story = {
  args: {
    symbol: "BTC",
    name: "Bitcoin",
    iconUrl: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/128/color/btc.png",
    size: 32
  }
};

export const Fallback: Story = {
  args: {
    symbol: "XYZ",
    name: "Unknown Coin",
    iconUrl: null,
    size: 32
  }
};
