import type { RemarkPlugin } from '@astrojs/markdown-remark'

import { toString } from 'mdast-util-to-string'
import * as R from 'remeda'

export const remarkExcerpt: RemarkPlugin = () => (tree, { data }) => {
  if (data.astro?.frontmatter === undefined) {
    return
  }

  data.astro.frontmatter.excerpt = R.pipe(
    tree.children,
    R.find((x) => x.type === 'paragraph'),
    toString,
  )
}
