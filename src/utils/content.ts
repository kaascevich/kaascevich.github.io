import type { CollectionEntry } from 'astro:content'

import { elementCounts } from '$/utils/arrays'
import { getCollection } from 'astro:content'

export async function getSortedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allBlogPosts = await getCollection(
    'posts',
    (post) => import.meta.env.DEV || !post.data.draft,
  )

  const sorted = allBlogPosts.toSorted((a, b) => {
    const dateA = new Date(a.data.published)
    const dateB = new Date(b.data.published)
    return dateA > dateB ? -1 : 1
  })

  for (const [index, value] of sorted.entries()) {
    const prev = sorted[index - 1]
    const next = sorted[index + 1]

    if (prev !== undefined) {
      value.data.prevID = prev.id
      value.data.prevTitle = prev.data.title
    }
    if (next !== undefined) {
      value.data.nextID = next.id
      value.data.nextTitle = next.data.title
    }
  }

  return sorted
}

export async function getTagCounts(): Promise<Map<string, number>> {
  const allBlogPosts = await getSortedPosts()

  return elementCounts(
    allBlogPosts
      .flatMap((post) => post.data.tags)
      .toSorted((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  )
}

export async function getCategoryCounts(): Promise<Map<string, number>> {
  const allBlogPosts = await getSortedPosts()

  return elementCounts(
    allBlogPosts
      .flatMap((post) => post.data.category)
      .toSorted((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  )
}
