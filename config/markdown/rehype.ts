import type { RehypePlugins } from "astro"

import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeFigure from "rehype-figure"
import rehypeSlug from "rehype-slug"

import { h } from "hastscript"

export default [
  rehypeFigure,
  rehypeSlug,
  [rehypeAutolinkHeadings, {
    behavior: "append",
    content: h("span", { hidden: "", style: "display: inline;" }, "#"),
    properties: {
      className: "heading-link",
      ariaHidden: true,
    },
  }],
  [rehypeExternalLinks, { target: "_blank" }],
] satisfies RehypePlugins
