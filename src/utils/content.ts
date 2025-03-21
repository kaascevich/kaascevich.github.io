import type { Post, PostsForYear } from '$/types/content'

import { getCollection } from 'astro:content'
import { entries, flatMap, groupBy, map, pipe, reverse, sortBy } from 'remeda'

import { elementCounts } from './arrays'

export async function getSortedPosts() {
  return pipe(
    await getCollection(
      'posts',
      (post) => import.meta.env.DEV || !post.data.draft,
    ),
    sortBy((x) => x.data.published),
    reverse(),
  )
}

export async function getTagCounts() {
  return pipe(
    await getSortedPosts(),
    flatMap((x) => x.data.tags),
    sortBy((x) => x.toLowerCase()),
    elementCounts,
  )
}

export async function getCategoryCounts() {
  return pipe(
    await getSortedPosts(),
    map((x) => x.data.category),
    sortBy((x) => x.toLowerCase()),
    elementCounts,
  )
}

export async function groupPostsByYear(posts?: Post[]): Promise<PostsForYear[]> {
  return pipe(
    posts ?? await getSortedPosts(),

    groupBy((post) => post.data.published.getFullYear()),
    entries(),
    map(([year, posts]) => ({ year: Number(year), posts })),

    // sort by year, descending
    sortBy((x) => x.year),
    reverse(),
  )
}
