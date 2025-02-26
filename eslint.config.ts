import { defineFlatConfig } from "eslint-define-config"

import js from "@eslint/js"
import ts, { type ConfigArray } from "typescript-eslint"
import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginSvelte from "eslint-plugin-svelte"
import eslintConfigPrettier from "eslint-config-prettier"
import type { TSConfig } from "node_modules/astro/dist/core/config/tsconfig"

// @ts-expect-error -- oh boy, I really don't wanna get into this right now
export default defineFlatConfig([
  js.configs.recommended,
  {
    rules: {
      // possible problems
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-self-compare": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",

      // suggestions
      camelcase: "warn",
      complexity: ["warn", 15],
      "consistent-return": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "logical-assignment-operators": "error",
      "new-cap": "warn",
      "no-alert": "warn",
      "no-array-constructor": "error",
      "no-caller": "error",
      "no-eval": "error",
      "no-extra-bind": "error",
      "no-extra-label": "error",
      "no-implicit-coercion": "error",
      "no-implied-eval": "error",
      "no-lonely-if": "error",
      "no-multi-assign": "error",
      "no-negated-condition": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      // "no-plusplus": "error",
      "no-return-assign": "error",
      "no-script-url": "error",
      "no-sequences": "error",
      "no-unneeded-ternary": "error",
      "no-unused-expressions": "error",
      "no-useless-call": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "one-var": ["error", "never"],
      "operator-assignment": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-numeric-literals": "error",
      "prefer-object-has-own": "error",
      "prefer-regex-literals": "error",
      "prefer-rest-params": "error",
      "prefer-template": "error",
      "require-await": "error",
      "require-yield": "error",
      strict: "error",
    },
  },

  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowIIFEs: true,
        },
      ],
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/prefer-destructuring": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowNumber: false,
          allowNullableObject: false,
          allowString: false,
        },
      ],

      "class-methods-use-this": "off",
      "@typescript-eslint/class-methods-use-this": "error",
      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "error",

      // FIXME: turn these back on once the project is cleaned up
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/prefer-literal-enum-member": "off",
    },
  } satisfies ConfigArray[number],

  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],

  ...eslintPluginSvelte.configs["flat/prettier"],
  eslintConfigPrettier,
])
