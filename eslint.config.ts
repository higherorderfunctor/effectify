import eslintConfig from '@effectify/eslint-config/typescript'

const ignores = ['eslint.config.js', 'packages/*/{build,dist}/**/*']

const tsEslintConfig = eslintConfig.map((config) => ({
  ...config,
  ignores,
  languageOptions: {
    ...config.languageOptions,
    parserOptions: {
      ...(config.languageOptions?.parserOptions ?? {}),
      tsconfigRootDir: __dirname,
    }
  }
}))

export default [
  ...tsEslintConfig
]
