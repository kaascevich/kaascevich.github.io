import type { CollectionEntry } from 'astro:content'

export type PostsForYear = {
  year: number
  posts: CollectionEntry<'posts'>[]
}
