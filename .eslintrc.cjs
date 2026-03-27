module.exports = {
  root: true,
  extends: ["@coin-platform/config-eslint"],
  overrides: [
    {
      files: ["**/*.tsx", "**/*.jsx"],
      extends: ["@coin-platform/config-eslint/react"]
    }
  ]
};
