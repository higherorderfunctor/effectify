
declare module 'eslint-plugin-sort-destructure-keys' {
import { Linter, Rule } from 'eslint';
  import type { Extends, Plugins, RuleOptions, Settings } from '@eslint-types/import/types';

   export const rules: CustomRuleOptions;
export const configs: {
    'recommended': Linter.FlatConfig;
    'typescript': Linter.FlatConfig;
};
}
