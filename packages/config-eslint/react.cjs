// 中文注释：配置说明。
module.exports = {
  extends: ["@coin-platform/config-eslint", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
