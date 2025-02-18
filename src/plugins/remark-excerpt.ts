import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { toString } from "mdast-util-to-string"

export const remarkExcerpt: RemarkPlugin =
  () =>
  (tree, { data }) => {
    let excerpt = ""
    for (const node of tree.children) {
      if (node.type !== "paragraph") {
        continue
      }
      excerpt = toString(node)
      break
    }
    data.astro!.frontmatter!.excerpt = excerpt
  }
