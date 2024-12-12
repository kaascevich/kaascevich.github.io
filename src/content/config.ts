import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/** A blog post. */
const post = defineCollection({
  loader: glob({
    pattern: import.meta.env.PROD ? ["**/*.md", "!drafts/**/*"] : "**/*.md",
    base: "src/content/blog",
  }),
  schema: () => z.object({
    /** The date this post was published. */
    published: z.date(),
    /**
     * The date this post was last modified, or `null`
     * if it has not yet been modified.
     */
    modified: z.date().optional(),
    /** The title of this post. */
    title: z.string(),
    /** Whether this post should be featured on the main page. */
    featured: z.boolean().optional(),
    /** This post's tags. */
    tags: z.array(z.string()).default(["other"]),
    /** The description of this post. */
    description: z.string(),
    /** The amount of time it should take to read this post. */
    readingTime: z.string().optional(),
  }),
});

/** A song. */
const song = defineCollection({
  type: "data",
  schema: () => z.object({
    /** The title of this song. */
    title: z.string(),
    /** The URL to this song's audio file. */
    sourceURL: z.string(),
    /** Remix-specific metadata. */
    remixDetails: z.object({
      /** The song's original composer. */
      composer: z.string(),
      /** A URL to the original song. */
      linkToOriginal: z.string(),
    }).optional()
  }),
});

export const collections = {
  "blog": post,
  "songs": song,
};
