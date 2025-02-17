import { getCollection, type CollectionEntry } from "astro:content"
import I18nKey from "@i18n/i18nKey"
import { i18n } from "@i18n/translation"
import { elementCounts } from "./array-utils"

export async function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  const allBlogPosts = await getCollection(
    "posts",
    (post) => import.meta.env.DEV || !post.data.draft,
  )

  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published)
    const dateB = new Date(b.data.published)
    return dateA > dateB ? -1 : 1
  })

  for (let i = 1; i < sorted.length; i += 1) {
    sorted[i]!.data.nextID = sorted[i - 1]!.id
    sorted[i]!.data.nextTitle = sorted[i - 1]!.data.title
  }
  for (let i = 0; i < sorted.length - 1; i += 1) {
    sorted[i]!.data.prevID = sorted[i + 1]!.id
    sorted[i]!.data.prevTitle = sorted[i + 1]!.data.title
  }

  return sorted
}

export type Tag = {
  name: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getSortedPosts()

  const counts = elementCounts(allBlogPosts.flatMap((post) => post.data.tags))

  return [...counts.keys()]
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((key) => ({ name: key, count: counts.get(key)! }))
}

export type Category = {
  name: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getSortedPosts()

  const counts = elementCounts(
    allBlogPosts.flatMap((post) =>
      post.data.category === "" ?
        i18n(I18nKey.uncategorized)
      : post.data.category,
    ),
  )

  return [...counts.keys()]
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((category) => ({ name: category, count: counts.get(category)! }))
}
