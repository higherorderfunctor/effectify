declare module 'eslint-plugin-import' {
  import { Linter, Rule } from 'eslint'
  import type {
    Extends, Plugins, RuleOptions, Settings,
  } from '@eslint-types/import/types'

  export const rules: CustomRuleOptions
  export const configs: {
    recommended: Linter.Config
    typescript: Linter.Config
  }
}
