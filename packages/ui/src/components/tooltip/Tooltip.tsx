import type { PropsWithChildren } from "react";

export interface TooltipProps {
  content: string;
}

export function Tooltip({ content, children }: PropsWithChildren<TooltipProps>) {
  return <span title={content}>{children}</span>;
}
