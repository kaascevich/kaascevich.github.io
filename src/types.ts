import type { CollectionEntry, CollectionKey } from "astro:content";

/** Global configuration for the site. */
export interface Site {
  /** The site's URL. */
  url: URL,
  /** The site's author. */
  author: string,
  /** The author's profile page. */
  profile: URL,
  /** The site's description. */
  description: string,
  /** The site's title. */
  title: string,
  /** The number of posts to show on the main page. */
  postsPerIndex: number,
  /** The number of posts to show on each page. */
  postsPerPage: number,
  /**
   * The number of minutes before a post's publish
   * date when the post should become visible.
   */
  scheduledPostMargin: number,
}

/** A social media service. */
export interface Social {
  /** The social media service's name. */
  name: string,
  /** The link's title. */
  title: string,
  /** The URL to the social media service. */
  href: string,
}

/** A date-time string parsable by Dayjs. */
export type DateTime = string;

/** Metadata for an Astro content collection entry. */
export type EntryInfo<T extends CollectionKey> =
  Readonly<{ id: string } & CollectionEntry<T>["data"]>
