import eslintConfig from './packages/eslint-config/src/typescript.js'

const ignores = ['eslint.config.js', 'packages/*/{build,dist}/**/*']


const tsEslintConfig = eslintConfig.then(eslintConfig => eslintConfig.map(config => ({
  ...config,
  ignores,
  // languageOptions: {
  //   ...config.languageOptions,
  //   parserOptions: {
  //     ...(config.languageOptions?.parserOptions ?? {}),
  //     tsconfigRootDir: __dirname,
  //   },
  // },
})))

export default tsEslintConfig;
