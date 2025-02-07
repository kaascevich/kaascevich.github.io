import type { CollectionEntry, CollectionKey } from "astro:content"

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
