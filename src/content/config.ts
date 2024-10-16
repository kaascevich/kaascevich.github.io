import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: () => z.object({
    published: z.date(),
    modified: z.date().optional(),
    title: z.string(),
    featured: z.boolean().optional(),
    tags: z.array(z.string()).default(["other"]),
    description: z.string(),
    readingTime: z.string().optional(),
  }),
});

const songs = defineCollection({
  type: "data",
  schema: () => z.object({
    title: z.string(),
    source: z.string(),
    remixDetails: z.object({
      composer: z.string(),
      linkToOriginal: z.string(),
    }).optional()
  }),
});

export const collections = { blog, songs };
