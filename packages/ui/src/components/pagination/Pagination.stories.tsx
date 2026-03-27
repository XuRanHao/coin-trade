import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
用途：
用于列表数据的页码导航，支持上一页/下一页与页码点击跳转。

对外 API：
- current: 当前页（从 1 开始）
- total: 总条数
- pageSize: 每页条数
- onPageChange: 页码变化回调
`
      }
    }
  },
  argTypes: {
    current: { control: false, description: "当前页码（受控）" },
    total: { control: "number", description: "总数据条数" },
    pageSize: { control: "number", description: "每页条数" },
    onPageChange: { control: false, description: "页码变更回调" },
    prevLabel: { control: "text", description: "上一页按钮文案" },
    nextLabel: { control: "text", description: "下一页按钮文案" }
  }
};

export default meta;
type Story = StoryObj<typeof Pagination>;

function PaginationDemo({
  total,
  pageSize,
  prevLabel,
  nextLabel
}: {
  total: number;
  pageSize: number;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      current={page}
      total={total}
      pageSize={pageSize}
      onPageChange={setPage}
      prevLabel={prevLabel}
      nextLabel={nextLabel}
    />
  );
}

export const Default: Story = {
  args: {
    total: 300,
    pageSize: 20,
    prevLabel: "PREV",
    nextLabel: "NEXT"
  },
  render: (args) => (
    <PaginationDemo
      total={args.total ?? 300}
      pageSize={args.pageSize ?? 20}
      prevLabel={args.prevLabel}
      nextLabel={args.nextLabel}
    />
  )
};

export const FewPages: Story = {
  args: {
    total: 60,
    pageSize: 20,
    prevLabel: "上一页",
    nextLabel: "下一页"
  },
  render: (args) => (
    <PaginationDemo
      total={args.total ?? 60}
      pageSize={args.pageSize ?? 20}
      prevLabel={args.prevLabel}
      nextLabel={args.nextLabel}
    />
  )
};
