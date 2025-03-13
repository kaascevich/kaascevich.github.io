import sortOrderSmacss from 'stylelint-config-property-sort-order-smacss/generate.js'

/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-html',
  ],
  plugins: ['stylelint-order'],
  overrides: [
    { files: ['*.svelte'], customSyntax: 'postcss-html' },
  ],
  rules: {
    'at-rule-descriptor-value-no-unknown': null,
    'declaration-property-value-no-unknown': null,
    'unit-no-unknown': true,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global'],
    }],

    'color-no-invalid-hex': true,
    'syntax-string-no-invalid': true,
    'function-linear-gradient-no-nonstandard-direction': true,

    'color-named': 'always-where-possible',

    'alpha-value-notation': 'percentage',
    'color-function-notation': 'modern',
    'color-hex-length': 'short',
    'hue-degree-notation': 'angle',
    'lightness-notation': 'percentage',
    'selector-not-notation': 'complex',
    'media-feature-range-notation': 'context',

    'declaration-empty-line-before': null,
    'no-descending-specificity': null,

    'order/properties-order': [
      sortOrderSmacss({ emptyLineBefore: 'always' }),
    ],
  },
}
