// @ts-check
import defineConfig from 'stylelint-define-config'

/// <reference types="@stylelint-types/stylelint-scss" />
/// <reference types="@stylelint-types/stylelint-order" />

/** @satisfies {Record<string, string[]>} */
const properties = /** @type {const} */ ({
  'all': [
    'all',
    'appearance',
  ],
  'box-sizing': [
    'box-sizing',
  ],
  'box': [
    'display',
    'position',
    'inset',
    'inset-block',
    'inset-block-start',
    'inset-block-end',
    'inset-inline',
    'inset-inline-start',
    'inset-inline-end',
    'top',
    'right',
    'bottom',
    'left',
  ],
  'float': [
    'float',
    'clear',
  ],
  'flex': [
    'flex',
    'flex-basis',
    'flex-direction',
    'flex-flow',
    'flex-grow',
    'flex-shrink',
    'flex-wrap',
  ],
  'grid': [
    'grid',
    'grid-area',
    'grid-template',
    'grid-template-areas',
    'grid-template-rows',
    'grid-template-columns',
    'grid-row',
    'grid-row-start',
    'grid-row-end',
    'grid-column',
    'grid-column-start',
    'grid-column-end',
    'grid-auto-rows',
    'grid-auto-columns',
    'grid-auto-flow',
  ],
  'gap': [
    'gap',
    'grid-gap',
    'row-gap',
    'grid-row-gap',
    'column-gap',
    'grid-column-gap',
  ],
  'place': [
    'place-content',
    'place-items',
    'place-self',

    'align-content',
    'align-items',
    'align-self',

    'justify-content',
    'justify-items',
    'justify-self',
  ],
  'order': [
    'order',
  ],
  'columns': [
    'columns',
    'column-fill',
    'column-rule',
    'column-rule-width',
    'column-rule-style',
    'column-rule-color',
    'column-span',
    'column-count',
    'column-width',
  ],
  'transform': [
    'backface-visibility',
    'perspective',
    'perspective-origin',
    'transform',
    'transform-origin',
    'transform-style',
    'translate',
    'rotate',
    'scale',
  ],
  'transition': [
    'transition',
    'transition-delay',
    'transition-duration',
    'transition-property',
    'transition-timing-function',
  ],
  'visibility': [
    'visibility',
    'opacity',
    'z-index',
  ],
  'margin': [
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'margin-block',
    'margin-block-start',
    'margin-block-end',
    'margin-inline',
    'margin-inline-start',
    'margin-inline-end',
  ],
  'outline': [
    'outline',
    'outline-offset',
    'outline-width',
    'outline-style',
    'outline-color',
  ],
  'border': [
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'border-width',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
  ],
  'border-block': [
    'border-block',
    'border-block-width',
    'border-block-style',
    'border-block-color',
    'border-block-start',
    'border-block-start-width',
    'border-block-start-style',
    'border-block-start-color',
    'border-block-end',
    'border-block-end-width',
    'border-block-end-style',
    'border-block-end-color',
  ],
  'border-inline': [
    'border-inline',
    'border-inline-width',
    'border-inline-style',
    'border-inline-color',
    'border-inline-start',
    'border-inline-start-width',
    'border-inline-start-style',
    'border-inline-start-color',
    'border-inline-end',
    'border-inline-end-width',
    'border-inline-end-style',
    'border-inline-end-color',
  ],
  'border-style': [
    'border-style',
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
  ],
  'border-radius': [
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-start-start-radius',
    'border-start-end-radius',
    'border-end-start-radius',
    'border-end-end-radius',
  ],
  'border-color': [
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
  ],
  'border-image': [
    'border-image',
    'border-image-source',
    'border-image-width',
    'border-image-outset',
    'border-image-repeat',
    'border-image-slice',
  ],
  'box-shadow': [
    'box-shadow',
  ],
  'blending': [
    'isolation',
    'mix-blend-mode',
  ],
  'background': [
    'background',
    'background-attachment',
    'background-clip',
    'background-color',
    'background-image',
    'background-blend-mode',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
  ],
  'cursor': [
    'cursor',
  ],
  'padding': [
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'padding-block',
    'padding-block-start',
    'padding-block-end',
    'padding-inline',
    'padding-inline-start',
    'padding-inline-end',
  ],
  'size': [
    'width',
    'block-size',
    'min-width',
    'min-block-size',
    'max-width',
    'max-block-size',

    'height',
    'inline-size',
    'min-height',
    'min-inline-size',
    'max-height',
    'max-inline-size',
  ],
  'overflow': [
    'overflow',
    'overflow-x',
    'overflow-y',
    'resize',
  ],
  'list-style': [
    'list-style',
    'list-style-type',
    'list-style-position',
    'list-style-image',
    'caption-side',
  ],
  'table': [
    'table-layout',
    'border-collapse',
    'border-spacing',
    'empty-cells',
  ],
  'animation': [
    'animation',
    'animation-name',
    'animation-duration',
    'animation-timing-function',
    'animation-delay',
    'animation-iteration-count',
    'animation-direction',
    'animation-fill-mode',
    'animation-play-state',
  ],
  'vertical-align': [
    'vertical-align',
  ],
  'text': [
    'direction',
    'tab-size',
    'text-align',
    'text-align-last',
    'text-justify',
    'text-indent',
    'text-transform',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-line',
    'text-decoration-style',
    'text-rendering',
    'text-shadow',
    'text-overflow',
  ],
  'text-layout': [
    'line-height',
    'word-spacing',
    'letter-spacing',
    'white-space',
    'word-break',
    'word-wrap',
    'color',
  ],
  'font': [
    'font',
    'font-family',
    'font-kerning',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-weight',
    'font-smoothing',
    'osx-font-smoothing',
    'font-variant',
    'font-style',
  ],
  'content': [
    'content',
    'quotes',
  ],
  'counter': [
    'counter-reset',
    'counter-increment',
  ],
  'page-break': [
    'page-break-before',
    'page-break-after',
    'page-break-inside',
  ],
  'events': [
    'pointer-events',
    'will-change',
  ],
})

export default defineConfig({
  extends: [
    'stylelint-config-concentric-order',
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

    'order/order': [
      // Imports
      { type: 'at-rule', name: 'import' },

      // Variables
      'dollar-variables',
      'custom-properties',

      // Inheritance
      { type: 'at-rule', name: 'extend' },

      // Mixins
      { type: 'at-rule', name: 'include' },
      { type: 'at-rule', name: 'mixin' },

      // Declarations
      'declarations',

      // Pseudo-elements
      {
        type: 'rule',
        selector: /^&::[\w-]+/,
        hasBlock: true,
      },

      // Pseudo-classes
      {
        type: 'rule',
        selector: /^&:[\w-]+/,
        hasBlock: true,
      },

      // Dark styles
      {
        type: 'at-rule',
        name: 'include',
        parameter: /dark$/i,
        hasBlock: true,
      },

      // Nested rules
      'rules',

      // Breakpoint mixins
      {
        type: 'at-rule',
        name: 'include',
        parameter: /(?:sm|md|lg|xl2?)$/i,
        hasBlock: true,
      },

      // Media queries
      { type: 'at-rule', name: 'media', hasBlock: true },
    ],
    'order/properties-order': [
      Object.entries(properties).map(([name, group]) => ({
        groupName: name,
        properties: group,
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
      })),
    ],
  },
})
