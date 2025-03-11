import type { CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'posts'>

export interface PostsForYear {
  year: number
  posts: readonly Post[]
}
