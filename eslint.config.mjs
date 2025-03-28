import antfu from '@antfu/eslint-config'

/**
 * @import {FlatConfigComposer} from 'eslint-flat-config-utils'
 * @import {TypedFlatConfigItem, ConfigNames} from '@antfu/eslint-config'
 */

/** @type {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>} */
export default antfu(
  {
    lessOpinionated: true,
    formatters: {
      css: false, // let Stylelint handle this
      html: true,
      xml: true,
      svg: true,
      markdown: true,
      graphql: true,
      prettierOptions: {
        printWidth: 80,
      },
      dprintOptions: true,
      slidev: true,
      astro: true,
    },

    astro: true,
    svelte: true,
    javascript: {
      overrides: {
        'camelcase': 'warn',
        'complexity': ['warn', 15],
        'consistent-return': 'error',
        'logical-assignment-operators': 'error',
        'no-constructor-return': 'error',
        'no-extra-label': 'error',
        'no-implicit-coercion': 'error',
        'no-lonely-if': 'error',
        'no-multi-assign': 'error',
        'no-negated-condition': 'error',
        'no-param-reassign': 'error',
        'no-plusplus': 'error',
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-useless-concat': 'error',
        'operator-assignment': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-has-own': 'error',
        'require-await': 'error',
        'require-yield': 'error',
        'strict': 'error',
      },
    },
    typescript: {
      tsconfigPath: 'tsconfig.json',
      overrides: {
        // 'ts/method-signature-style': 'error',
        // 'ts/no-useless-empty-export': 'error',
        // 'ts/prefer-readonly': 'error',
        // 'ts/prefer-ts-expect-error': 'error',
        // 'ts/restrict-template-expressions': ['error', { allowNumber: true }],
        // 'ts/return-await': ['error', 'always'], // FIXME: this override isn't applying?
        // 'ts/strict-boolean-expressions': ['error', {
        //   allowNumber: false,
        //   allowString: false,
        // }],

        'ts/no-unused-vars': 'off', // handled by the compiler
        'ts/explicit-function-return-type': 'off', // so we can infer stupidly-specific return types
        'ts/prefer-literal-enum-member': 'off',
      },
    },
    stylistic: {
      overrides: {
        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': ['error', '1tbs'],
        'style/jsx-wrap-multilines': ['off'],

        // setting this to 'off' will disable linter errors (which is helpful
        // for those lines that are gonna be too long no matter what you do),
        // but it'll still let the formatter wrap lines when feasible
        'style/max-len': ['off', 80, {
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
      },
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    name: 'perfectionist',
    rules: {
      'perfectionist/sort-imports': ['error', {
        type: 'natural',
        newlinesBetween: 'always',
        sortSideEffects: true,
        groups: [
          'type',
          'internal-type',
          ['parent-type', 'sibling-type', 'index-type'],

          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],

          ['style', 'side-effect-style'],

          'object',
        ],
      }],
    },
  },
)
