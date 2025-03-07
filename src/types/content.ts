import type { CollectionEntry } from 'astro:content'

export interface PostsForYear {
  year: number
  posts: readonly CollectionEntry<'posts'>[]
}
