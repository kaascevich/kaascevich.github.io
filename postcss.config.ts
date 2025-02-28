import type { Config } from "postcss-load-config"
import postcssImport from "postcss-import"
import tailwindcss from "tailwindcss"
import postcssNesting from "tailwindcss/nesting/index.js"

const config: Config = {
  plugins: {
    "postcss-import": postcssImport, // to combine multiple css files
    "tailwindcss/nesting": postcssNesting,
    tailwindcss,
  },
}
export default config
