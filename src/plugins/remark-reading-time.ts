import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { toString } from "mdast-util-to-string"
import getReadingTime from "reading-time"

export const remarkReadingTime: RemarkPlugin = () => (tree, { data }) => {
  if (data.astro?.frontmatter === undefined) {
    return
  }

  const { minutes, words } = getReadingTime(toString(tree))

  data.astro.frontmatter.minutes = Math.max(1, Math.round(minutes))
  data.astro.frontmatter.words = words
}
