import fs from "node:fs";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import ogImages from "astro-opengraph-images";
import compress from "@playform/compress";
import mdAstro from "@astropub/md";

import remarkCollapse from "remark-collapse";
import remarkReadingTime from "./src/utils/plugins/remarkReadingTime.mjs";
import remarkToc from "remark-toc";
import { remarkMark } from "remark-mark-highlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeFigure from "rehype-figure";

import sitemap from "@astrojs/sitemap";
import renderOgImage from "./src/utils/renderOgImage";
import { SITE } from "./src/config";

export default defineConfig({
  site: SITE.url,
  integrations: [
    tailwind({ applyBaseStyles: false }),
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
          conservativeCollapse: true,
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
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentIntellisense: true,
  },
});
