import type { ReactNode } from "react";
import { Input, type InputProps } from "../input/Input";

export interface AutocompleteOption {
  key: string;
  label: ReactNode;
}

export interface AutocompleteProps extends Omit<InputProps, "onSelect"> {
  options: AutocompleteOption[];
}

export function Autocomplete(props: AutocompleteProps) {
  return <Input {...props} />;
}
