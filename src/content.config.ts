import { glob } from "astro/loaders";
import { defineCollection, z, type CollectionEntry } from "astro:content";

/** The schema for a blog post. */
const post = defineCollection({
  loader: glob({
    // ignore draft posts unless we're on the dev server
    pattern: import.meta.env.PROD ? ["**/*.md", "!drafts/**/*"] : "**/*.md",
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
    tags: z.array(z.string().toLowerCase()).default(["other"]),
    /** This post's description. */
    description: z.string(),
  }),
});

/** The schema for a song. */
const song = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/songs" }),
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
  }),
});

export const collections = {
  "posts": post,
  "songs": song,
};

/** A blog post. */
export type Post = CollectionEntry<"posts">;

/** A song. */
export type Song = CollectionEntry<"songs">;
