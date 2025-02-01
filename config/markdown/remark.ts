import type { RemarkPlugins } from "astro"

import remarkReadingTime from "../../src/utils/plugins/remarkReadingTime"
import remarkToc from "remark-toc"
import { remarkMark } from "remark-mark-highlight"
import { remarkDefinitionList } from "remark-definition-list"

export default [
  remarkToc,
  remarkReadingTime,
  remarkMark,
  remarkDefinitionList,
] satisfies RemarkPlugins
