import type { PostsForYear } from '$/types/content'
import type { CollectionEntry } from 'astro:content'

import { elementCounts } from '$/utils/arrays'
import { getCollection } from 'astro:content'

export async function getSortedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection(
    'posts',
    (post) => import.meta.env.DEV || !post.data.draft,
  )

  return allPosts.toSorted((a, b) => {
    const dateA = new Date(a.data.published)
    const dateB = new Date(b.data.published)
    return dateA > dateB ? -1 : 1
  })
}

export async function getTagCounts() {
  const allPosts = await getSortedPosts()

  return elementCounts(
    allPosts
      .flatMap((post) => post.data.tags)
      .toSorted((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  )
}

export async function getCategoryCounts() {
  const allPosts = await getSortedPosts()

  return elementCounts(
    allPosts
      .flatMap((post) => post.data.category)
      .toSorted((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  )
}

export async function groupPostsByYear(
  posts?: CollectionEntry<'posts'>[] | undefined,
): Promise<PostsForYear[]> {
  const allPosts = posts ?? await getSortedPosts()
  const groups = Array.from(
    Map.groupBy(allPosts, (post) => post.data.published.getFullYear()),
    ([year, posts]) => ({ year, posts }),
  )

  return groups.toSorted((a, b) => b.year - a.year) // sort by year, descending
}
