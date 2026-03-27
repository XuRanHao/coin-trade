import type { StorybookConfig } from "@storybook/react-vite";

// 中文注释：映射配置说明。
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  docs: {
    autodocs: "tag"
  }
};

export default config;
