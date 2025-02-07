import getReadingTime from "reading-time"
import { toString } from "mdast-util-to-string"
import type { RemarkPlugin } from "@astrojs/markdown-remark"

/**
 * A plugin to calculate reading times for posts, and then inject these reading
 * times into the frontmatter.
 */
export const remarkReadingTime: RemarkPlugin = () => (tree, { data }) => {
  const textOnPage = toString(tree)
  const exactReadingTime = getReadingTime(textOnPage).minutes
  const readingTime = Math.max(1, Math.round(exactReadingTime))

  data.astro!.frontmatter!.readingTime =
    `about ${readingTime} ${readingTime === 1 ? "minute" : "minutes"}`
}
