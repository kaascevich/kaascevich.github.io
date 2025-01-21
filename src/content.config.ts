import { glob, file } from "astro/loaders";
import { defineCollection, z, type CollectionEntry } from "astro:content";

/** The schema for a blog post. */
const post = defineCollection({
  loader: glob({
    // only show draft posts when we're on the dev server
    pattern: import.meta.env.DEV ? ["*.md", "drafts/*.md"] : "*.md",
    base: "src/content/blog",
  }),
  schema: () => z.object({
    /** The date this post was published. */
    published: z.string().datetime({ offset: true }),
    /** The date this post was last modified, if any. */
    modified: z.string().datetime({ offset: true }).optional(),
    /** This post's title. */
    title: z.string(),
    /** Whether this post should be featured on the main page. */
    featured: z.boolean().optional(),
    /** This post's tags. */
    tags: z.array(z.string().regex(/^[a-z0-9]+(?:\-[a-z0-9]+)*$/)).default(["other"]),
    /** This post's description. */
    description: z.string(),
  }).readonly(),
});

/** The schema for a song. */
const song = defineCollection({
  loader: file("src/content/songs.yaml"),
  schema: () => z.object({
    /** This song's title. */
    title: z.string(),
    /** Remix-specific metadata. */
    remixDetails: z.object({
      /** The song's original composer. */
      composer: z.string(),
      /** A URL to the original song. */
      linkToOriginal: z.string().url(),
    }).optional()
  }).readonly(),
});

export const collections = {
  "posts": post,
  "songs": song,
};

/** A blog post. */
export type Post = CollectionEntry<"posts">;

/** Metadata for a blog post. */
export type PostInfo = Readonly<{
  id: string,
} & Post["data"]>;

/** A song. */
export type Song = CollectionEntry<"songs">;

/** Metadata for a song. */
export type SongInfo = Readonly<{
  id: string,
} & Song["data"]>;
