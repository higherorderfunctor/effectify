// packages/eslint-config/src/typescript.ts
import {FlatCompat} from "@eslint/eslintrc";
import js2 from "@eslint/js";
import EslintPluginStylistic from "@stylistic/eslint-plugin";
import * as TypescriptEslintParser from "@typescript-eslint/parser";
var jsFiles = ["**/*.{js,jsx,cjs,mjs}"];
var tsFiles = ["**/*.{ts,d.ts,tsx,cts,mts}"];
var compat = new FlatCompat({});
var common = {
  ignores: [],
  files: [...jsFiles, ...tsFiles],
  languageOptions: {
    parser: TypescriptEslintParser,
    parserOptions: {
      project: ["[tj]sconfig.*.json", "packages/*/[tj]sconfig.*.json"],
      ecmaVersion: "latest",
      sourceType: "module"
    }
  },
  settings: {
    "import/parsers": {
      espree: [".js", ".cjs", ".mjs", ".jsx"],
      "@typescript-eslint/parser": [".ts", ".d.ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["[tj]sconfig.*.json", "packages/*/[tj]sconfig.*.json"]
      },
      node: true
    }
  }
};
var eslintRecommended = {
  ...js2.configs.recommended,
  ...common
};
var eslintPluginStylistic = {
  ...EslintPluginStylistic.configs["recommended-flat"],
  ...common
};
var airbnbBase = compat.extends("eslint-config-airbnb-base").map((config) => ({
  ...config,
  ...common
}));
var airbnbWhitespace = compat.extends("eslint-config-airbnb-base/whitespace");
var eslintConfig = [
  eslintRecommended,
  eslintPluginStylistic,
  ...airbnbBase
];
var typescript_default = eslintConfig;

// eslint.config.ts
var ignores = ["eslint.config.js", "packages/*/{build,dist}/**/*"];
var tsEslintConfig = typescript_default.map((config) => ({
  ...config,
  ignores
}));
var eslint_config_default = [
  ...tsEslintConfig
];
export {
  eslint_config_default as default
};
