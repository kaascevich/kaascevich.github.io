import type { AstroUserConfig } from "astro"

import remarkPlugins from "./markdown/remark"
import rehypePlugins from "./markdown/rehype"
import shikiConfig from "./markdown/shiki"

import { defListHastHandlers } from "remark-definition-list"

export default {
  remarkPlugins,
  rehypePlugins,
  shikiConfig,
  remarkRehype: {
    footnoteBackContent: "↑",
    handlers: defListHastHandlers,
  },
} satisfies AstroUserConfig["markdown"]
