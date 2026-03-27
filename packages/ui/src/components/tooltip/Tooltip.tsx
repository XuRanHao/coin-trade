import type { PropsWithChildren } from "react";

// 中文注释：类型定义说明。 (TooltipProps)
export interface TooltipProps {
  content: string;
}

// 中文注释：核心逻辑说明。 (Tooltip)
export function Tooltip({ content, children }: PropsWithChildren<TooltipProps>) {
  return <span title={content}>{children}</span>;
}
