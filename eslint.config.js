// packages/eslint-config/src/typescript.ts
import {FlatCompat} from "@eslint/eslintrc";
import js2 from "@eslint/js";
import EslintPluginStylistic from "@stylistic/eslint-plugin";
import TypescriptEslintParser from "@typescript-eslint/parser";
import * as EslintPluginImport from "eslint-plugin-import";
var __dirname = "/home/caubut/Documents/projects/effectify/packages/eslint-config/src";
var jsFiles = ["**/*.{js,jsx,cjs,mjs}"];
var tsFiles = ["**/*.{ts,tsx,cts,mts}"];
var compat = new FlatCompat({
  baseDirectory: __dirname
});
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
      "@typescript-eslint/parser": [".ts", ".tsx"]
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
var eslintPlugImport = [
  ...[
    ...compat.config(EslintPluginImport.configs.recommended),
    ...compat.config(EslintPluginImport.configs.typescript)
  ].map((config) => ({
    ...config,
    ...common
  }))
];
var eslintConfig = [
  eslintRecommended,
  eslintPluginStylistic,
  ...eslintPlugImport
];
var typescript_default = eslintConfig;

// eslint.config.ts
var __dirname = "/home/caubut/Documents/projects/effectify";
var ignores = ["eslint.config.js", "packages/*/{build,dist}/**/*"];
var tsEslintConfig = typescript_default.map((config) => ({
  ...config,
  ignores,
  languageOptions: {
    ...config.languageOptions,
    parserOptions: {
      ...config.languageOptions?.parserOptions ?? {},
      tsconfigRootDir: __dirname
    }
  }
}));
var eslint_config_default = [
  ...tsEslintConfig
];
export {
  eslint_config_default as default
};
