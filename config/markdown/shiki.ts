import type { ShikiConfig } from "astro";

import shellSession from "@robot-inventor/shell-session-syntax";
import {
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerMetaHighlight,
} from "@shikijs/transformers";

export default {
  themes: { light: "catppuccin-latte", dark: "catppuccin-macchiato" },
  langs: [shellSession],
  langAlias: { plist: "xml" },
  transformers: [
    transformerNotationHighlight({ matchAlgorithm: "v3" }),
    transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
    transformerMetaHighlight(),
  ],
} satisfies ShikiConfig;
