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

export async function getTagCounts(): Promise<Map<string, number>> {
  const allPosts = await getSortedPosts()

  return elementCounts(
    allPosts
      .flatMap((post) => post.data.tags)
      .toSorted((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  )
}

export async function getCategoryCounts(): Promise<Map<string, number>> {
  const allPosts = await getSortedPosts()

  return elementCounts(
    allPosts
      .flatMap((post) => post.data.category)
      .toSorted((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  )
}
