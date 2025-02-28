import antfu from "@antfu/eslint-config"

/**
 * @import {FlatConfigComposer} from "eslint-flat-config-utils"
 * @import {TypedFlatConfigItem, ConfigNames} from "@antfu/eslint-config"
 */

/** @type {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>} */
export default antfu(
  {
    lessOpinionated: true,

    formatters: true,
    astro: true,
    svelte: true,
    javascript: {
      overrides: {
        // possible problems
        "no-constructor-return": "error",
        "no-duplicate-imports": "error",

        // suggestions
        "camelcase": "warn",
        "complexity": ["warn", 15],
        "consistent-return": "error",
        "logical-assignment-operators": "error",
        "no-extra-label": "error",
        "no-implicit-coercion": "error",
        "no-lonely-if": "error",
        "no-multi-assign": "error",
        "no-negated-condition": "error",
        "no-param-reassign": "error",
        // "no-plusplus": "error",
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-useless-concat": "error",
        "operator-assignment": "error",
        "prefer-numeric-literals": "error",
        "prefer-object-has-own": "error",
        "require-await": "error",
        "require-yield": "error",
        "strict": "error",
      },
    },
    typescript: {
      tsconfigPath: "tsconfig.json",
      overrides: {
        "ts/consistent-type-definitions": ["error", "type"],
        "ts/consistent-type-exports": "error",
        "ts/consistent-type-imports": "error",
        "ts/method-signature-style": "error",
        "ts/no-non-null-assertion": "off",
        "ts/no-useless-empty-export": "error",
        "ts/prefer-destructuring": "error",
        "ts/prefer-readonly": "error",
        "ts/prefer-ts-expect-error": "error",
        "ts/restrict-template-expressions": [
          "error",
          { allowNumber: true },
        ],
        "ts/strict-boolean-expressions": [
          "error",
          {
            allowNumber: false,
            allowString: false,
          },
        ],

        // FIXME: turn these back on once the project is cleaned up
        "ts/no-unsafe-argument": "off",
        "ts/no-unsafe-assignment": "off",
        "ts/no-unsafe-call": "off",
        "ts/no-unsafe-member-access": "off",
        "ts/no-unsafe-return": "off",
      },
    },
    stylistic: {
      quotes: "double", // I have a SERIOUS dislike for single-quoted strings
    },
  },
  {
    rules: {
      "import/consistent-type-specifier-style": "off",
      "style/arrow-parens": ["error", "always"],
    },
  },
)
