import { getCollection, type CollectionEntry } from "astro:content"
import I18nKey from "@i18n/i18nKey"
import { i18n } from "@i18n/translation"

export async function getFilteredPosts(): Promise<CollectionEntry<"posts">[]> {
  return await getCollection(
    "posts",
    (post) => import.meta.env.DEV || !post.data.draft,
  )
}

export async function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  const allBlogPosts = await getFilteredPosts()
  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published)
    const dateB = new Date(b.data.published)
    return dateA > dateB ? -1 : 1
  })

  for (let i = 1; i < sorted.length; i += 1) {
    sorted[i]!.data.nextSlug = sorted[i - 1]!.slug
    sorted[i]!.data.nextTitle = sorted[i - 1]!.data.title
  }
  for (let i = 0; i < sorted.length - 1; i += 1) {
    sorted[i]!.data.prevSlug = sorted[i + 1]!.slug
    sorted[i]!.data.prevTitle = sorted[i + 1]!.data.title
  }

  return sorted
}

export type Tag = {
  name: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getFilteredPosts()

  const counts: Record<string, number> = {}
  allBlogPosts.map((post) => {
    post.data.tags.map((tag) => {
      counts[tag] ??= 0
      counts[tag] += 1
    })
  })

  return Object.keys(counts)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((key) => ({ name: key, count: counts[key]! }))
}

export type Category = {
  name: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getFilteredPosts()

  const counts: Record<string, number> = {}
  allBlogPosts.map((post: CollectionEntry<"posts">) => {
    const category =
      post.data.category === "" ?
        i18n(I18nKey.uncategorized)
      : post.data.category

    counts[category] ??= 0
    counts[category] += 1
  })

  return Object.keys(counts)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((category) => ({ name: category, count: counts[category]! }))
}
