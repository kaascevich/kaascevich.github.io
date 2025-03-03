import type { CollectionEntry } from 'astro:content'

export interface PostsForYear {
  year: number
  posts: CollectionEntry<'posts'>[]
}
