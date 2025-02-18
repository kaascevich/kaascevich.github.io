import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { toString } from "mdast-util-to-string"
import getReadingTime from "reading-time"

export const remarkReadingTime: RemarkPlugin =
  () =>
  (tree, { data }) => {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    data.astro!.frontmatter!.minutes = Math.max(
      1,
      Math.round(readingTime.minutes),
    )
    data.astro!.frontmatter!.words = readingTime.words
  }
