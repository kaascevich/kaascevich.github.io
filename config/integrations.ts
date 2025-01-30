import type { AstroIntegration } from "astro";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import ogImages from "astro-opengraph-images";
import mdAstro from "@astropub/md";
import compress from "@playform/compress";

import fs from "node:fs";
import renderOgImage from "../src/utils/renderOgImage";

export default [
  react(),
  sitemap(),
  ogImages({
    options: {
      fonts: [
        {
          name: "Recursive",
          weight: 600,
          style: "normal",
          data: fs.readFileSync("public/fonts/recursive-sans-semibold.ttf"),
        },
      ],
    },
    render: renderOgImage,
  }),
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
] satisfies AstroIntegration[];
