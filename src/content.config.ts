import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

function internalOnly(name: string): z.ZodEffects<z.ZodDefault<z.ZodString>> {
  return z
    .string()
    .default("")
    .refine(
      (value) => value === "",
      `\`${name}\` is for internal use only and must not be specified`,
    )
}

const internalProperties = z.object({
  prevTitle: internalOnly("prevTitle"),
  prevID: internalOnly("prevID"),
  nextTitle: internalOnly("nextTitle"),
  nextID: internalOnly("nextID"),
})

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z
    .object({
      /** The title of the post. */
      title: z.string(),
      /** The date the post was published. */
      published: z.date(),
      /** The date the post was last updated. */
      updated: z.date().optional(),
      /**
       * Whether the post is a draft.
       *
       * Draft posts won't be shown in production.
       */
      draft: z.boolean().optional().default(false),
      /** The description of the post. */
      description: z.string(),
      /**
       * The cover image for the post.
       *
       * - If this is a URL, the image is fetched from that URL.
       * - If this is a path relative to `/`, the image is fetched from the site
       *   root.
       * - Otherwise, it's interpreted as a path relative to the post's Markdown
       *   file.
       */
      image: z.string().optional().default(""),
      /**
       * A list of the post's tags.
       *
       * This array must not contain duplicates.
       */
      tags: z
        .array(z.string())
        .optional()
        .default([])
        .refine(
          (tags) => tags.length === new Set(tags).size,
          "tags array must not contain duplicates",
        ),
      /** The category of the post. */
      category: z.string().optional().default(""),
      /** The language the post was written in. */
      lang: z.string().optional().default(""),
    })
    .readonly()
    .and(internalProperties),
})

export const collections = {
  posts: postsCollection,
}
