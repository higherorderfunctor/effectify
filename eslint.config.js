// packages/eslint-config/src/typescript.ts
import js2 from "@eslint/js";
import EslintPluginStylistic from "@stylistic/eslint-plugin";
import * as TypescriptEslintParser from "@typescript-eslint/parser";
import {Effect, Array, Record} from "effect";
var jsFiles = ["**/*.{js,jsx,cjs,mjs}"];
var tsFiles = ["**/*.{ts,d.ts,tsx,cts,mts}"];
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
var compat = {
  extend: (configToExtend) => Effect.gen(function* (_) {
    console.log(configToExtend);
    const config = yield* _(Effect.tryPromise({ try: () => import(configToExtend), catch: (error) => error }));
    const configs = Array.flatten(yield* _(Effect.all((config.extends ? typeof config.extends === "string" ? [config.extends] : config.extends : []).map(compat.extend))));
    const plugins = yield* _(Effect.all((config.plugins ?? []).map(compat.plugin)).pipe(Effect.map(Record.fromEntries)));
    const base = { plugins, rules: config.rules ?? {}, ...common };
    return [...configs, base];
  }),
  plugin: (plugin) => Effect.tryPromise({ try: () => import(`eslint-plugin-${plugin}`), catch: (error) => error }).pipe(Effect.map((p) => [plugin, p]))
};
var airbnbBase = compat.extend("eslint-config-airbnb-base");
var airbnbWhitespace = compat.extend("eslint-config-airbnb-base/whitespace");
var eslintConfig = Effect.runPromise(Effect.all([airbnbBase, airbnbWhitespace]).pipe(Effect.map(Array.flatten), Effect.map((configs) => [
  eslintRecommended,
  eslintPluginStylistic,
  ...configs
])));
var typescript_default = eslintConfig;

// eslint.config.ts
var ignores = ["eslint.config.js", "packages/*/{build,dist}/**/*"];
var tsEslintConfig = typescript_default.then((eslintConfig2) => eslintConfig2.map((config) => ({
  ...config,
  ignores
})));
var eslint_config_default = tsEslintConfig;
export {
  eslint_config_default as default
};
