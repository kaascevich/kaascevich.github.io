import fs from "node:fs";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import ogImages from "astro-opengraph-images";
import compress from "@playform/compress";
import mdAstro from "@astropub/md";
import svgr from "vite-plugin-svgr";

import remarkCollapse from "remark-collapse";
import remarkReadingTime from "./src/utils/plugins/remarkReadingTime.mjs";
import remarkToc from "remark-toc";
import { remarkMark } from "remark-mark-highlight";
import { remarkDefinitionList, defListHastHandlers } from "remark-definition-list";
import rehypeExternalLinks from "rehype-external-links";
import rehypeFigure from "rehype-figure";

import sitemap from "@astrojs/sitemap";
import renderOgImage from "./src/utils/renderOgImage";
import { SITE } from "./src/config";

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  site: SITE.url,
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
      [remarkCollapse, { test: "Table of contents", }],
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
      langAlias: {
        plist: "xml",
      },
    },
    remarkRehype: {
      footnoteBackContent: "↑",
      handlers: defListHastHandlers
    },
  },
  vite: {
    plugins: [
      svgr(),
    ],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `
          @use "sass:math"
          @use "sass:color"
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
    },
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentIntellisense: true,
    svg: true,
  },
});
