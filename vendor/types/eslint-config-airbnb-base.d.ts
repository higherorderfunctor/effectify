declare module 'eslint-config-airbnb-base' {
  import { Linter, Rule } from 'eslint'
  module.exports = Linter.Config;
  const eslintConfig: Linter.BaseConfig;
  export default eslintConfig;
}
