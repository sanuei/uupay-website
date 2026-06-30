import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const announcementsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/announcements" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    type: z.string(),
  }),
});

export const collections = {
  'announcements': announcementsCollection,
};
