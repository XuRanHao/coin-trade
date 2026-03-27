import type { ReactNode } from "react";
import { Input, type InputProps } from "../input/Input";

// 中文注释：类型定义说明。 (AutocompleteOption)
export interface AutocompleteOption {
  key: string;
  label: ReactNode;
}

// 中文注释：类型定义说明。 (AutocompleteProps)
export interface AutocompleteProps extends Omit<InputProps, "onSelect"> {
  options: AutocompleteOption[];
}

// 中文注释：核心逻辑说明。 (Autocomplete)
export function Autocomplete(props: AutocompleteProps) {
  return <Input {...props} />;
}
