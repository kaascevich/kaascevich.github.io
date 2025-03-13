import type { RemarkPlugin } from '@astrojs/markdown-remark'

import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
import * as R from 'remeda'

export const remarkReadingTime: RemarkPlugin = () => (tree, { data }) => {
  if (data.astro?.frontmatter === undefined) {
    return
  }

  const { minutes, words } = R.pipe(tree, toString, getReadingTime)

  data.astro.frontmatter.minutes = R.pipe(
    minutes,
    Math.round,
    R.clamp({ min: 1 }),
  )
  data.astro.frontmatter.words = words
}
