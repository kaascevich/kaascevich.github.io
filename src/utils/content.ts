import type { Post } from '$/types/content'

import { getCollection } from 'astro:content'
import path from 'node:path'
import { entries, flatMap, groupBy, map, pipe, reverse, sortBy } from 'remeda'

import { elementCounts } from './arrays'
import { getDir } from './urls'

/**
 * Returns a list of posts, sorted by publish date.
 *
 * If `import.meta.env.PROD` is `true`, excludes posts with the `draft` property
 * set to `true`.
 *
 * @return A list of posts, sorted by publish date.
 */
export async function getSortedPosts(): Promise<Post[]> {
  return pipe(
    await getCollection(
      'posts',
      (post) => import.meta.env.DEV || !post.data.draft,
    ),
    sortBy((x) => x.data.published),
    reverse(),
  )
}

/**
 * Returns a map of tags and their counts.
 *
 * @return A map of tags and their counts.
 */
export async function getTagCounts() {
  return pipe(
    await getSortedPosts(),
    flatMap((x) => x.data.tags),
    sortBy((x) => x.toLowerCase()),
    elementCounts,
  )
}

/**
 * Returns a map of categories and their counts.
 *
 * @return A map of categories and their counts.
 */
export async function getCategoryCounts() {
  return pipe(
    await getSortedPosts(),
    map((x) => x.data.category),
    sortBy((x) => x.toLowerCase()),
    elementCounts,
  )
}

export async function groupPostsByYear(posts?: Post[]) {
  return pipe(
    posts ?? await getSortedPosts(),

    groupBy((post) => post.data.published.getFullYear()),
    entries(),
    map(([year, posts]) => [Number(year), posts] as const),

    // sort by year, descending
    sortBy((x) => x[0]),
    reverse(),
  )
}

export function getBasePath(post: Post) {
  return path.join('content/posts/', getDir(`${post.id}/`))
}
