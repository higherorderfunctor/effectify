import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import EslintPluginStylistic from '@stylistic/eslint-plugin'
import * as TypescriptEslintParser from '@typescript-eslint/parser'
import { ESLint, Linter  } from 'eslint'

// import EslintPluginCodegen, {
//   processors as EslintPluginCodegenProcessors,
// } from "eslint-plugin-codegen";
// import EslintPluginDeprecation from "eslint-plugin-deprecation";
import * as EslintPluginImport from 'eslint-plugin-import'
// import EslintPluginJsonc from "eslint-plugin-jsonc";
// import EslintPluginMarkdown from "eslint-plugin-markdown";
// import * as EslintPluginPreferArrowFunctions from "eslint-plugin-prefer-arrow-functions";
// import EslintPluginTypescript from '@typescript-eslint/eslint-plugin';
// import EslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// import * as EslintPluginPromise from "eslint-plugin-promise";
// import EslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
// import * as EslintPluginSortDestructureKeys from "eslint-plugin-sort-destructure-keys";
// import JsoncEslintParser from "jsonc-eslint-parser";

//   "devDependencies": {
//     "@eslint-types/import": "^2.29.1",
//     "effect": "^2.4.18",
//     "eslint-config-prettier": "^9.1.0",
//     "eslint-plugin-codegen": "^0.28.0",
//     "eslint-plugin-deprecation": "^2.0.0",
//     "eslint-plugin-jsonc": "^2.15.1",
//     "eslint-plugin-markdown": "^4.0.1",
//     "eslint-plugin-prefer-arrow-functions": "^3.3.2",
//     "eslint-plugin-prettier": "^5.1.3",
//     "eslint-plugin-promise": "^6.1.1",
//     "eslint-plugin-simple-import-sort": "^12.1.0",
//     "eslint-plugin-sort-destructure-keys": "^1.5.0",
//     "jsonc-eslint-parser": "^2.4.0"
//   },
//   "peerDependencies": {
//     "eslint-plugin-codegen": "^0.28.0",
//     "eslint-plugin-deprecation": "^2.0.0",
//     "eslint-plugin-jsonc": "^2.15.1",
//     "eslint-plugin-markdown": "^4.0.1",
//     "eslint-plugin-prefer-arrow-functions": "^3.3.2",
//     "eslint-plugin-prettier": "^5.1.3",
//     "eslint-plugin-promise": "^6.1.1",
//     "eslint-plugin-simple-import-sort": "^12.1.0",
//     "eslint-plugin-sort-destructure-keys": "^1.5.0",
//     "jsonc-eslint-parser": "^2.4.0"
//   },

// "scripts": {
//   "clean": "node scripts/clean.mjs",
//   "codegen": "pnpm --recursive --parallel run codegen",
//   "circular": "madge --extensions ts --circular --no-color --no-spinner packages/*/src",
//   "test": "vitest",
//   "coverage": "vitest --coverage",
//   "check": "tsc -b tsconfig.json",
//   "check-recursive": "pnpm --recursive exec tsc -b tsconfig.json",
//   "docgen": "pnpm --recursive --parallel exec docgen && node scripts/docs.mjs",
//   "dtslint": "pnpm --recursive --parallel run dtslint",
//   "dtslint-clean": "dtslint --installAll",
//   "changeset-version": "changeset version && node scripts/version.mjs",
//   "changeset-publish": "pnpm build && changeset publish"
// },
// "devDependencies": {
//   "@babel/core": "^7.24.3",
//   "@changesets/changelog-github": "^0.5.0",
//   "@changesets/cli": "^2.27.1",
//   "@effect/docgen": "^0.3.8",
//   "@effect/dtslint": "^0.0.5",
//   "@effect/eslint-plugin": "^0.1.2",
//   "@effect/language-service": "^0.1.0",
//   "esbuild": "^0.20.2",
//   "eslint-plugin-codegen": "^0.27.0",
//   "eslint-plugin-deprecation": "^2.0.0",
//   "eslint-plugin-simple-import-sort": "^12.0.0",
//   "eslint-plugin-sort-destructure-keys": "^1.5.0",
//   "fast-check": "^3.16.0",
//   "glob": "^10.3.10",
//   "madge": "^6.1.0",
//   "playwright": "^1.42.1",
//   "prettier": "^3.2.5",
//   "rimraf": "^5.0.5",
//   "tsx": "^4.7.1",
//   "vite": "^5.2.2",
//   "vitest": "^1.4.0"
// }

const jsFiles = ['**/*.{js,jsx,cjs,mjs}']
const tsFiles = ['**/*.{ts,d.ts,tsx,cts,mts}']
// const jsonFiles = ["**/*.json", "**/*.json5", "**/*.jsonc"];

// const compat = new FlatCompat({
//   // baseDirectory: import.meta.dir,
// })

const common: Linter.FlatConfig = {
  ignores: [],
  files: [...jsFiles, ...tsFiles],
  languageOptions: {
    parser: TypescriptEslintParser,
    parserOptions: {
      project: ['[tj]sconfig.*.json', 'packages/*/[tj]sconfig.*.json'],
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  settings: {
    'import/parsers': {
      "espree": ['.js', '.cjs', '.mjs', '.jsx'],
      '@typescript-eslint/parser': ['.ts', '.d.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['[tj]sconfig.*.json', 'packages/*/[tj]sconfig.*.json'],
      },
      node: true,
    },
  },
}

const eslintRecommended: Linter.FlatConfig = {
  ...js.configs.recommended,
  ...common,
};

const eslintPluginStylistic: Linter.FlatConfig = {
  // eslint-disable-next-line import/no-named-as-default-member
  ...EslintPluginStylistic.configs['recommended-flat'],
  ...common,
}

// import EslintConfigAirbnbBase from 'eslint-config-airbnb-base';

import {Effect, Array, Record} from 'effect';

const compat = {
  extend: (configToExtend: string): Effect.Effect<Linter.FlatConfig[], unknown> => Effect.gen(function* (_) {
    console.log(configToExtend)
    const config: Linter.Config = yield* _(Effect.tryPromise({ try: () => import(configToExtend), catch: (error) => error }));
    const configs = Array.flatten(yield* _(Effect.all((config.extends ? (typeof config.extends === 'string' ? [config.extends] : config.extends) : []).map(compat.extend))));
    const plugins = yield* _(Effect.all((config.plugins ?? []).map(compat.plugin)).pipe(Effect.map(Record.fromEntries)));
    const base: Linter.FlatConfig = {plugins, rules: config.rules ?? {}, ...common  };
    return [...configs, base];
  }),
  plugin: (plugin: string): Effect.Effect<[string, ESLint.Plugin], unknown> =>
    Effect.tryPromise({ try: () => import(`eslint-plugin-${plugin}`), catch: (error) => error }).pipe(Effect.map((p) => [plugin, p])),


}

// TODO: recursive loader with plugins
// const airbnbBase: Promise<Linter.FlatConfig[]> = Effect.runPromise(Effect.succeed(EslintConfigAirbnbBase.extends ?? []).pipe(
//   Effect.map((xs) => typeof xs === 'string' ? [xs] : xs),
//   Effect.tap(Console.log),
//   Effect.flatMap((xs) => Effect.promise(() => Promise.all(xs.map((x) => import(x) as Promise<Linter.FlatConfig>)))),
//   Effect.map((xs) => xs.map(({ default: { rules, plugins } }) => ({ rules, plugins, ...common }))),
//   Effect.tap(Console.log),
// ));

const airbnbBase: Effect.Effect<Linter.FlatConfig[], unknown> = compat
  .extend('eslint-config-airbnb-base')
  // .map(config => ({
  //   ...config,
  //   ...common,
  // }))

const airbnbWhitespace: Effect.Effect<Linter.FlatConfig[], unknown> = compat
  .extend('eslint-config-airbnb-base/whitespace')
//  // .map((config) => ({
//  //   ...config,
//  //   ...common,
//  // }));

// const airbnbTypescriptBase = compat
//   .extends("eslint-config-airbnb-typescript/base")
//   .map((config) => ({
//     ...config,
//     ...common,
//   }));
//
// const typescriptEslintStrictTypeChecked = compat
//   .extends("plugin:@typescript-eslint/strict-type-checked")
//   .map((config) => ({
//     ...config,
//     ...common,
//     files: tsFiles,
//   }));
//
// const typescriptEslintStylisticTypeChecked = compat
//   .extends("plugin:@typescript-eslint/stylistic-type-checked")
//   .map((config) => ({
//     ...config,
//     ...common,
//   }));
//
// const eslintPluginTypescript = [
//   ...[
//     ...compat.config(EslintPluginTypescript.configs['strict-type-checked']),
//     ...compat.config(EslintPluginTypescript.configs['stylistic-type-checked']),
//   ].map((config) => ({
//     ...config,
//     plugins: {
//       '@typescript-eslint': EslintPluginTypescript,
//     },
//     ...common,
//   })),
// ];

// const eslintPluginPrettier = [{
//   ...EslintPluginPrettierRecommended,
//   ...common,
// }];
//
// const eslintPluginPrettierJson = [{
//   ...EslintPluginPrettierRecommended,
//   languageOptions: {
//     parser: JsoncEslintParser,
//   },
//   files: jsonFiles,
//   ignores,
// }];
//
// const eslintPlugImport: Linter.FlatConfig[] = [
//   ...[
//     ...compat.config(EslintPluginImport.configs.recommended),
//     ...compat.config(EslintPluginImport.configs.typescript),
//   ].map(config => ({
//     ...config,
//     ...common,
//   })),
// ]

// const eslintPlugPromise = [{
//   ...EslintPluginPromise.configs.recommended,
//   ...common,
// }];

// const eslintPluginJsonc = [
//   ...compat
//     .config(EslintPluginJsonc.configs["recommended-with-jsonc"])
//     .map((config) => ({
//       ...config,
//       plugins: {
//         jsonc: EslintPluginJsonc,
//       },
//       languageOptions: {
//         parser: JsoncEslintParser,
//       },
//       files: jsonFiles,
//       ignores,
//     })),
// ];

// const eslintPluginMarkdown = [
//   {
//     plugins: {
//       markdown: EslintPluginMarkdown,
//       codegen: EslintPluginCodegen,
//     },
//     processor: {
//       ...EslintPluginCodegenProcessors.processor,
//       // hack for eslint --cache to work
//       meta: {
//         name: "eslint-plugin-codegen-md-processor",
//         version: EslintPluginCodegen.version,
//       },
//     },
//     files: ["*.md"],
//     ignores,
//   },
// ];

// const eslintPuginCodegen = [
//   {
//     rules: { "codegen/codegen": "error" },
//     plugins: {
//       codegen: EslintPluginCodegen,
//     },
//     files: ["*.md", "**/*.md/*", ...tsFiles],
//     ignores,
//   },
// ];

const eslintConfig: Promise<Linter.FlatConfig[]> = Effect.runPromise(Effect.all([airbnbBase, airbnbWhitespace]).pipe(
  Effect.map(Array.flatten),
  Effect.map(((configs) => [
  eslintRecommended,
  eslintPluginStylistic,
  ...configs,
]))));
  // ...airbnbWhitespace,
  /// / ...eslintPluginJsonc,
  /// / ...eslintPluginMarkdown,
  /// / ...eslintPuginCodegen,
  // ...airbnbTypescriptBase,
  // ...typescriptEslintStrictTypeChecked,
  // ...typescriptEslintStylisticTypeChecked,
  /// / ...eslintPluginTypescript,
  // ...eslintPluginPrettier,
  // ...eslintPluginPrettierJson,
  // ...eslintPlugImport,
  // ...eslintPlugPromise,
  // {
  //  ...common,
  //  plugins: {
  //    deprecation: EslintPluginDeprecation,
  //    "prefer-arrow-functions": EslintPluginPreferArrowFunctions,
  //    "simple-import-sort": EslintPluginSimpleImportSort,
  //    "sort-destructure-keys": EslintPluginSortDestructureKeys,
  //  },
  //  linterOptions: {
  //    reportUnusedDisableDirectives: true,
  //  },
  //  rules: {
  //    /**
  //     * Custom deprecation rules
  //     */
  //    "deprecation/deprecation": "warn",
  //    /**
  //     * Custom general style rules
  //     */
  //    // sort destructuring keys
  //    "sort-destructure-keys/sort-destructure-keys": "error",
  //    // types
  //    "@typescript-eslint/ban-types": [
  //      "error",
  //      { types: { "{}": false }, extendDefaults: true },
  //    ],
  //    "@typescript-eslint/no-empty-interface": "off",
  //    // naming conventions
  //    "@typescript-eslint/naming-convention": [
  //      "error",
  //      // preferred defaults
  //      {
  //        selector: "default",
  //        leadingUnderscore: "forbid",
  //        trailingUnderscore: "forbid",
  //        format: [],
  //      },
  //      {
  //        selector: "variableLike",
  //        format: ["snake_case", "camelCase", "PascalCase", "UPPER_CASE"],
  //      },
  //      {
  //        selector: "function",
  //        format: ["snake_case", "camelCase"],
  //        leadingUnderscore: "allow",
  //      },
  //      { selector: "typeLike", format: ["PascalCase"] },
  //      {
  //        selector: "property",
  //        format: ["camelCase"],
  //      },
  //      // global exceptions
  //      {
  //        selector: "variable",
  //        modifiers: ["global", "const"],
  //        format: [],
  //        filter: {
  //          regex: "^(__dirname|__filename)$",
  //          match: true,
  //        },
  //      },
  //      // work around for declared globals
  //      {
  //        selector: "variable",
  //        modifiers: ["const"], // global doesn't work in a `declare global` block
  //        format: [],
  //        filter: {
  //          regex: `^(${Object.keys(common.languageOptions.globals).join("|")})$`,
  //          match: true,
  //        },
  //      },
  //      // adds PascalCase for nested types
  //      {
  //        selector: "typeProperty",
  //        format: ["camelCase", "PascalCase"],
  //      },
  //      // adds UPPER_CASE for static constants
  //      {
  //        selector: "classProperty",
  //        modifiers: ["static", "readonly", "public"],
  //        format: ["UPPER_CASE"],
  //      },
  //      // remove restrictions when working with JSON objects
  //      {
  //        selector: "objectLiteralProperty",
  //        format: [],
  //      },
  //      {
  //        selector: "objectLiteralMethod",
  //        format: ["snake_case"],
  //        leadingUnderscore: "allow",
  //      },
  //      // useful for error reporting types with one ignored property
  //      // e.g., type MyErrorType = { _: never }
  //      {
  //        selector: "typeProperty",
  //        format: [],
  //        filter: { regex: "^_$", match: true },
  //      },
  //      // useful for ignored parameters
  //      {
  //        selector: "parameter",
  //        leadingUnderscore: "allow",
  //        format: ["camelCase"],
  //      },
  //      // Effect exception(s) to underscore rules
  //      {
  //        selector: ["typeProperty", "memberLike"],
  //        format: [],
  //        filter: { regex: "^(_tag)$", match: true },
  //      },
  //    ],
  //    // default is warn, covered by above
  //    "no-underscore-dangle": "off",
  //    // default convention is interface, changed to type
  //    // default is on, conflicts with Effect conventions
  //    // e.g., const A = ...; type A = MappedType<typeof A>
  //    "@typescript-eslint/no-redeclare": "off",
  //    // match effects style conventions
  //    "@stylistic/yield-star-spacing": ["error", "after"],
  //    // prettier handles these
  //    "@stylistic/operator-linebreak": "off",
  //    "@stylistic/brace-style": "off",
  //    "@stylistic/indent": "off",
  //    "@stylistic/indent-binary-ops": "off",
  //    "@stylistic/semi": "off",
  //    "@stylistic/quotes": "off",
  //    // emulate TS with exceptions for names that start with _
  //    "@typescript-eslint/no-unused-vars": [
  //      "error",
  //      {
  //        args: "all",
  //        argsIgnorePattern: "^_",
  //        caughtErrors: "all",
  //        caughtErrorsIgnorePattern: "^_",
  //        destructuredArrayIgnorePattern: "^_",
  //        varsIgnorePattern: "^_",
  //        ignoreRestSiblings: true,
  //      },
  //    ],
  //    "@typescript-eslint/no-shadow": "off",
  //    // only require quotes when needed
  //    "@stylistic/quote-props": ["error", "as-needed"],
  //    // semis preferred for types
  //    "@stylistic/member-delimiter-style": [
  //      "error",
  //      {
  //        multiline: {
  //          delimiter: "semi",
  //          requireLast: true,
  //        },
  //        singleline: {
  //          delimiter: "semi",
  //          requireLast: false,
  //        },
  //        multilineDetection: "brackets",
  //      },
  //    ],
  //    /**
  //     * Custom arrow function style enforcement rules
  //     */
  //    // default is off
  //    "arrow-body-style": ["error", "as-needed"],
  //    // default is off
  //    "@stylistic/arrow-parens": ["error", "always"],
  //    // default is off
  //    "prefer-arrow-callback": "error",
  //    // default is warn; adds exceptions for generators used by this project
  //    "func-names": [
  //      "warn",
  //      "always",
  //      {
  //        generators: "never",
  //      },
  //    ],
  //    // default is off
  //    "func-style": "error",
  //    // default is off
  //    "prefer-arrow-functions/prefer-arrow-functions": [
  //      "error",
  //      {
  //        disallowPrototype: true,
  //        returnStyle: "implicit",
  //      },
  //    ],
  //    /**
  //     * Custom comment rules
  //     */
  //    // default is off; also adjusted location
  //    "no-warning-comments": [
  //      "warn",
  //      {
  //        location: "anywhere",
  //      },
  //    ],
  //    /**
  //     * Custom import/export rules
  //     */
  //    // bun hacks
  //    "import/no-unresolved": ["error", { ignore: ["bun:test"] }],
  //    // disable as it conflicts with simple-import-sort
  //    "sort-imports": "off",
  //    // disable as it conflicts with simple-import-sort
  //    "import/order": "off",
  //    // default is warn
  //    "import/no-duplicates": "error",
  //    // makes js and ts rules in sync
  //    "import/extensions": ["error", "ignorePackages", { ts: "js" }],
  //    // check type imports and add development exceptions
  //    "import/no-extraneous-dependencies": [
  //      "error",
  //      {
  //        includeTypes: true,
  //        devDependencies: [
  //          "esbuild.*.ts",
  //          "eslint.*.[tj]s",
  //          "eslint.*.c[tj]s",
  //          "eslint.*.m[tj]s",
  //          "jest.*.[tj]s",
  //          "packages/*/esbuild.*.ts",
  //          "packages/*/tests/*.[tj]s",
  //          "packages/*/tests/**/*.[tj]s",
  //        ],
  //      },
  //    ],
  //    // default is off; set custom sort order
  //    "simple-import-sort/imports": [
  //      "error",
  //      {
  //        groups: [["^\\u0000"], ["^node:"], ["^@?\\w"], ["^#"], ["^\\."]],
  //      },
  //    ],
  //    // default is off
  //    "simple-import-sort/exports": ["error"],
  //    // type imports
  //    "@typescript-eslint/consistent-type-imports": "error",
  //    // doesn't mix well with @effect
  //    "import/prefer-default-export": "off",
  //    /**
  //     * Custom promise rules
  //     */
  //    "promise/always-return": ["error", { ignoreLastCallback: true }],
  //  },
  // },

export default eslintConfig
