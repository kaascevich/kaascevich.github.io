import type { AstroIntegration } from "astro"

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import mdAstro from "@astropub/md"
import compress from "@playform/compress"

export default [
  react(),
  sitemap(),
  mdAstro(),
  compress({
    HTML: {
      "html-minifier-terser": {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        quoteCharacter: '"',
        removeAttributeQuotes: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    },
    JavaScript: {
      "terser": {
        toplevel: true,
      },
    },
  }),
] satisfies AstroIntegration[]
