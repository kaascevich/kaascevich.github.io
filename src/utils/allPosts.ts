import { SITE } from "@/config"
import { getCollection } from "astro:content"
import day from "dayjs"
import type { EntryInfo } from "@/types"

function getPostSortIndex({ published, modified }: EntryInfo<"posts">) {
  return Math.floor(day(modified ?? published).valueOf() / 1000)
}

const allPostsRaw = await getCollection("posts", post =>
  import.meta.env.DEV || day() > day(post.data.published).subtract(
    SITE.scheduledPostMargin, "minutes"
  )
)

/** A list of all blog posts, sorted by publication or modification date. */
const allPosts: EntryInfo<"posts">[] = allPostsRaw
  .map(({ id, data }) => ({ id, ...data }))
  .sort((a, b) => getPostSortIndex(b) - getPostSortIndex(a))

export default allPosts
