import type { Post, PostsForYear } from '$/types/content'

import { elementCounts } from '$/utils/arrays'
import { getCollection } from 'astro:content'
import * as R from 'remeda'

export async function getSortedPosts() {
  return R.pipe(
    await getCollection(
      'posts',
      (post) => import.meta.env.DEV || !post.data.draft,
    ),
    R.sortBy((x) => x.data.published),
    R.reverse(),
  )
}

export async function getTagCounts() {
  return R.pipe(
    await getSortedPosts(),
    R.flatMap((x) => x.data.tags),
    R.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    elementCounts,
  )
}

export async function getCategoryCounts() {
  return R.pipe(
    await getSortedPosts(),
    R.map((x) => x.data.category),
    R.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    elementCounts,
  )
}

export async function groupPostsByYear(posts?: Post[]): Promise<PostsForYear[]> {
  return R.pipe(
    posts ?? await getSortedPosts(),

    R.groupBy((post) => post.data.published.getFullYear()),
    R.entries(),
    R.map(([year, posts]) => ({ year: Number(year), posts })),

    // sort by year, descending
    R.sortBy(R.prop('year')),
    R.reverse(),
  )
}
