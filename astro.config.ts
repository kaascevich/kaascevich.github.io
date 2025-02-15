import type { AstroUserConfig } from "astro"

import { SITE } from "./src/config"

import integrations from "./config/integrations"
import markdown from "./config/markdown"
import vite from "./config/vite"

export default {
  site: SITE.url,
  integrations,
  markdown,
  vite,
  scopedStyleStrategy: "where",
  experimental: {
    contentIntellisense: true,
    svg: true,
  },
} satisfies AstroUserConfig
