import { defineConfig } from "astro/config"

import sitemap from "@astrojs/sitemap"
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import swup from "@swup/astro"
import compress from "astro-compress"
import icon from "astro-icon"
import { pagefind } from "vite-plugin-pagefind"

import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeComponents, { type ComponentFunction } from "rehype-components"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import { admonitionComponent } from "./src/plugins/rehype-component-admonition"
import { githubCardComponent } from "./src/plugins/rehype-component-github-card"

import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list"
import remarkDirective from "remark-directive"
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives"
import remarkMath from "remark-math"
import remarkSectionize from "remark-sectionize"

import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype"
import { remarkExcerpt } from "./src/plugins/remark-excerpt"
import { remarkReadingTime } from "./src/plugins/remark-reading-time"

import shellSession from "@robot-inventor/shell-session-syntax"

export default defineConfig({
  site: "https://fuwari.vercel.app/",
  base: "/",
  trailingSlash: "always",
  integrations: [
    tailwind({
      nesting: true,
    }),
    swup({
      theme: false,
      animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
      // the default value `transition-` cause transition delay
      // when the Tailwind class `transition-all` is used
      containers: ["main", "#toc"],
      smoothScrolling: true,
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateBodyClass: false,
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
    sitemap(),
    compress({
      CSS: false,
      Image: false,
      Action: {
        // https://github.com/PlayForm/Compress/issues/376
        Passed: () =>
          new Promise((resolve) => {
            resolve(true)
          }),
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkExcerpt,
      remarkGithubAdmonitionsToDirectives,
      remarkDefinitionList,
      remarkDirective,
      remarkSectionize,
      parseDirectiveNode,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeComponents,
        {
          components: {
            github: (properties, children) =>
              githubCardComponent(properties, children),
            note: (properties, children) =>
              admonitionComponent(properties, children, "note"),
            tip: (properties, children) =>
              admonitionComponent(properties, children, "tip"),
            important: (properties, children) =>
              admonitionComponent(properties, children, "important"),
            caution: (properties, children) =>
              admonitionComponent(properties, children, "caution"),
            warning: (properties, children) =>
              admonitionComponent(properties, children, "warning"),
          } satisfies Record<string, ComponentFunction>,
        },
      ],
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
              className: ["anchor-icon"],
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
  vite: {
    build: {
      rollupOptions: {
        external: "/pagefind/pagefind.js?url",
        onwarn(warning, warn) {
          // temporarily suppress this warning
          if (
            warning.message.includes("is dynamically imported by") &&
            warning.message.includes("but also statically imported by")
          ) {
            return
          }
          warn(warning)
        },
      },
    },
    plugins: [pagefind({ outputDirectory: "dist" })],
  },
})
