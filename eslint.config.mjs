/// <reference types="typescript-eslint" />

import { defineFlatConfig } from "eslint-define-config"

import js from "@eslint/js"
import ts from "typescript-eslint"
import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginSvelte from "eslint-plugin-svelte"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineFlatConfig([
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
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
      "capitalized-comments": ["warn", "never"],
      "class-methods-use-this": "warn",
      complexity: ["warn", 15],
      "consistent-return": "error",
      eqeqeq: "error",
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
      "no-invalid-this": "error",
      "no-lonely-if": "error",
      "no-multi-assign": "error",
      "no-negated-condition": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      "no-plusplus": "error",
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
      "no-void": "error",
      "object-shorthand": "error",
      "one-var": "error",
      "operator-assignment": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-numeric-literals": "error",
      "prefer-object-has-own": "error",
      "prefer-object-spread": "error",
      "prefer-regex-literals": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "require-await": "error",
      "require-yield": "error",
      strict: "error",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...eslintPluginSvelte.configs["flat/prettier"],
  eslintConfigPrettier,
])
