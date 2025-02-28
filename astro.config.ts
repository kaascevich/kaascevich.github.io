import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import shellSession from "@robot-inventor/shell-session-syntax"
import swup from "@swup/astro"
import compress from "astro-compress"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import {
  defListHastHandlers,
  remarkDefinitionList,
} from "remark-definition-list"
import remarkMath from "remark-math"
import remarkSectionize from "remark-sectionize"
import { pagefind } from "vite-plugin-pagefind"
import siteConfig from "./src/config/site"
import { remarkExcerpt } from "./src/plugins/remark-excerpt"
import { remarkReadingTime } from "./src/plugins/remark-reading-time"

export default defineConfig({
  site: siteConfig.url,
  base: "/",
  trailingSlash: "ignore",
  integrations: [
    tailwind({
      nesting: true,
      applyBaseStyles: false,
    }),
    swup({
      theme: false,
      animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
      // the default value `transition-` cause transition delay
      // when the Tailwind class `transition-all` is used
      containers: ["main", "#toc"],
      globalInstance: true,
    }),
    icon({
      include: {
        "preprocess: vitePreprocess(),": ["*"],
        "fa6-brands": ["*"],
        "fa6-regular": ["*"],
        "fa6-solid": ["*"],
      },
    }),
    svelte(),
    mdx(),
    sitemap(),
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
          quoteCharacter: "\"",
          removeAttributeQuotes: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
      },
      JavaScript: {
        terser: {
          toplevel: true,
        },
      },
      Action: {
        // https://github.com/PlayForm/Compress/issues/376
        // eslint-disable-next-line require-await
        Passed: async () => new Promise((resolve) => resolve(true)),
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkExcerpt,
      remarkDefinitionList,
      remarkSectionize,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor"],
          },
          content: {
            type: "element",
            tagName: "span",
            properties: {
              "className": ["anchor-icon"],
              "data-pagefind-ignore": true,
            },
            children: [
              {
                type: "text",
                value: "#",
              },
            ],
          },
        },
      ],
    ],
    remarkRehype: {
      handlers: { ...defListHastHandlers },
    },
    shikiConfig: {
      langs: [shellSession],
      langAlias: { plist: "xml" },
    },
  },
  server: {
    // host: "0.0.0.0",
  },
  vite: {
    build: {
      rollupOptions: {
        external: "/pagefind/pagefind.js?url",
        onwarn: (warning, handler) => {
          if (
            warning.message.includes("is dynamically imported by")
            && warning.message.includes("but also statically imported by")
          ) {
            return
          }

          if (
            warning.code === "css_unused_selector"
            || warning.code === "vite-plugin-svelte-preprocess-many-dependencies"
          ) {
            return
          }

          handler(warning)
        },
      },
    },
    plugins: [pagefind({ outputDirectory: "dist" })],
  },
})
