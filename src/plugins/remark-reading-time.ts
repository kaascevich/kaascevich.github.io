import type { RemarkPlugin } from '@astrojs/markdown-remark'

import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
import { pipe } from 'remeda'

export const remarkReadingTime: RemarkPlugin = () => (tree, { data }) => {
  if (data.astro?.frontmatter === undefined) {
    return
  }

  const { minutes, words } = pipe(tree, toString, getReadingTime)

  data.astro.frontmatter.minutes = pipe(
    minutes,
    Math.round,
    (x) => Math.min(1, x),
  )
  data.astro.frontmatter.words = words
}
