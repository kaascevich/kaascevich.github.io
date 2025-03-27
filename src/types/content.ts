import type { CollectionEntry } from 'astro:content'

/** A post. */
export type Post = CollectionEntry<'posts'>

/** A callout type. */
export type CalloutType = 'tip' | 'note' | 'important' | 'warning' | 'caution'
