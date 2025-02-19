import postcssImport from "postcss-import"
import postcssNesting from "tailwindcss/nesting/index.js"
import tailwindcss from "tailwindcss"
import type { Config } from "postcss-load-config"

const config: Config = {
  plugins: {
    "postcss-import": postcssImport, // to combine multiple css files
    "tailwindcss/nesting": postcssNesting,
    tailwindcss,
  },
}
export default config
