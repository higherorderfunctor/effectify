// packages/eslint-config/src/typescript.ts
import js2 from "@eslint/js";
import TypescriptEslintParser from "@typescript-eslint/parser";
var jsFiles = ["**/*.{js,jsx,cjs,mjs}"];
var tsFiles = ["**/*.{ts,tsx,cts,mts}"];
var ignores = [];
var common = {
  ignores,
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
var eslintRecommended = [
  {
    ...js2.configs.recommended,
    ...common
  }
];
var eslintConfig = [
  ...eslintRecommended
];
var typescript_default = eslintConfig;

// eslint.config.ts
var __dirname = "/home/caubut/Documents/projects/effectify";
var ignores2 = ["eslint.config.js", "packages/*/{build,dist}/**/*"];
var tsEslintConfig = typescript_default.map((config) => ({
  ...config,
  ignores: ignores2,
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
