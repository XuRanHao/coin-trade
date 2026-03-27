import type { Meta, StoryObj } from "@storybook/react";
import { ChartPanel } from "./ChartPanel";

const meta: Meta<typeof ChartPanel> = {
  title: "Components/ChartPanel",
  component: ChartPanel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于图表场景的标准容器，统一标题区、右侧扩展区（extra）与图表内容区布局。

对外 API：
- title: 面板标题。
- extra: 标题右侧扩展区域（如周期切换、状态标签）。
- children: 图表主体内容。
`
      }
    }
  },
  argTypes: {
    title: { description: "图表面板标题。", control: "text" },
    extra: { description: "标题右侧扩展内容。", control: false },
    children: { description: "图表主体内容。", control: false }
  },
  args: {
    title: "Price + Prediction"
  }
};

export default meta;
type Story = StoryObj<typeof ChartPanel>;

export const Default: Story = {
  render: (args) => (
    <ChartPanel {...args} extra={<span>Interval: 1H</span>}>
      <div style={{ height: 180, display: "grid", placeItems: "center" }}>Chart Area</div>
    </ChartPanel>
  )
};
