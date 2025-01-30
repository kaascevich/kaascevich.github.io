import type { AstroUserConfig } from "astro";

import fs from "node:fs";
import react from "@astrojs/react";
import ogImages from "astro-opengraph-images";
import compress from "@playform/compress";
import mdAstro from "@astropub/md";
import svgr from "vite-plugin-svgr";

import remarkReadingTime from "./src/utils/plugins/remarkReadingTime";
import remarkToc from "remark-toc";
import { remarkMark } from "remark-mark-highlight";
import { remarkDefinitionList, defListHastHandlers } from "remark-definition-list";
import rehypeExternalLinks from "rehype-external-links";
import rehypeFigure from "rehype-figure";

import shellSession from "@robot-inventor/shell-session-syntax";
import {
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerMetaHighlight,
} from "@shikijs/transformers";

import sitemap from "@astrojs/sitemap";
import renderOgImage from "./src/utils/renderOgImage";
import { SITE } from "./src/config";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

/** The name of this config file. */
const __filename = fileURLToPath(import.meta.url);
/** The filesystem path to this config file. */
const __dirname = dirname(__filename);

export default {
  site: SITE.url.href,
  integrations: [
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
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkReadingTime,
      remarkMark,
      remarkDefinitionList,
    ],
    rehypePlugins: [
      rehypeFigure,
      [rehypeExternalLinks, { target: "_blank" }],
    ],
    shikiConfig: {
      themes: { light: "catppuccin-latte", dark: "catppuccin-macchiato" },
      langs: [shellSession],
      langAlias: { plist: "xml" },
      transformers: [
        transformerNotationHighlight({ matchAlgorithm: "v3" }),
        transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
        transformerMetaHighlight(),
      ],
    },
    remarkRehype: {
      footnoteBackContent: "↑",
      handlers: defListHastHandlers,
    },
  },
  vite: {
    plugins: [svgr()],
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname, "src")}/`,
      },
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `
          @use "sass:color"
          @use "sass:math"
          @use "@/styles/variables/border-radiuses.sass"
          @use "@/styles/variables/chars.sass"
          @use "@/styles/variables/colors.sass"
          @use "@/styles/variables/font-sizes.sass"
          @use "@/styles/variables/font-weights.sass"
          @use "@/styles/functions.sass" as *
          @use "@/styles/mixins.sass" as *
          `,
          silenceDeprecations: ["mixed-decls"],
        },
      },
      preprocessorMaxWorkers: true,
    },
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentIntellisense: true,
    svg: true,
  },
} satisfies AstroUserConfig;
