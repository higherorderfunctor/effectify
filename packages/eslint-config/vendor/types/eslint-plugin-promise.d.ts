
declare module 'eslint-plugin-promise' {
  import { Linter, Rule } from 'eslint';
  export const rules: {
     'param-names': Rule,
     'no-return-wrap': Rule,
     'always-return': Rule,
     'catch-or-return': Rule,
     'prefer-await-to-callbacks': Rule,
     'prefer-await-to-then': Rule,
     'no-native': Rule,
     'no-callback-in-promise': Rule,
     'no-promise-in-callback': Rule,
     'no-nesting': Rule,
     'avoid-new': Rule,
     'no-new-statics': Rule,
     'no-return-in-finally': Rule,
     'valid-params': Rule,
     'no-multiple-resolved': Rule,
   },

    export const configs: {
        'recommended': Linter.FlatConfig;
    };
}
// module.exports = {
//   rules: {
//     'param-names': require('./rules/param-names'),
//     'no-return-wrap': require('./rules/no-return-wrap'),
//     'always-return': require('./rules/always-return'),
//     'catch-or-return': require('./rules/catch-or-return'),
//     'prefer-await-to-callbacks': require('./rules/prefer-await-to-callbacks'),
//     'prefer-await-to-then': require('./rules/prefer-await-to-then'),
//     'no-native': require('./rules/no-native'),
//     'no-callback-in-promise': require('./rules/no-callback-in-promise'),
//     'no-promise-in-callback': require('./rules/no-promise-in-callback'),
//     'no-nesting': require('./rules/no-nesting'),
//     'avoid-new': require('./rules/avoid-new'),
//     'no-new-statics': require('./rules/no-new-statics'),
//     'no-return-in-finally': require('./rules/no-return-in-finally'),
//     'valid-params': require('./rules/valid-params'),
//     'no-multiple-resolved': require('./rules/no-multiple-resolved'),
//   },
//   rulesConfig: {
//     'param-names': 1,
//     'always-return': 1,
//     'no-return-wrap': 1,
//     'no-native': 0,
//     'catch-or-return': 1,
//   },
//   configs: {
//     recommended: {
//       plugins: ['promise'],
//       rules: {
//         'promise/always-return': 'error',
//         'promise/no-return-wrap': 'error',
//         'promise/param-names': 'error',
//         'promise/catch-or-return': 'error',
//         'promise/no-native': 'off',
//         'promise/no-nesting': 'warn',
//         'promise/no-promise-in-callback': 'warn',
//         'promise/no-callback-in-promise': 'warn',
//         'promise/avoid-new': 'off',
//         'promise/no-new-statics': 'error',
//         'promise/no-return-in-finally': 'warn',
//         'promise/valid-params': 'warn',
//       },
//     },
//   },
// }
