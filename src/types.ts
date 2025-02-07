import type { CollectionEntry, CollectionKey } from "astro:content"

/** Global configuration for the site. */
export interface Site {
  /** The site's URL. */
  readonly url: string
  /** The site's author. */
  readonly author: string
  /** The author's profile page. */
  readonly profile: string
  /** The site's description. */
  readonly description: string
  /** The site's title. */
  readonly title: string
  /** The number of posts to show on the main page. */
  readonly postsPerIndex: number
  /** The number of posts to show on each page. */
  readonly postsPerPage: number
  /**
   * The number of minutes before a post's publish date when the post should
   * become visible.
   */
  readonly scheduledPostMargin: number
}

/** A social media service. */
export interface Social {
  /** The social media service's name. */
  readonly name: string
  /** The link's title. */
  readonly title: string
  /** The URL to the social media service. */
  readonly href: string
}

/** A date-time string parsable by Dayjs. */
export type DateTime = string

/** Metadata for an Astro content collection entry. */
export type EntryInfo<T extends CollectionKey> =
{ readonly id: string } & Readonly<CollectionEntry<T>["data"]>
