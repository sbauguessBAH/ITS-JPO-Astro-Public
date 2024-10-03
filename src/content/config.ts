import { z, defineCollection } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
      title: z.string(),
      date: z.date(),
      image: z.string().optional(),      
    }),
  }),

  blog: defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
      title: z.string(),
      date: z.date(),
      image: z.string().optional(),      
    }),
  }),

  infographics: defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
      title: z.string(),
      catagory: z.string(),
    }),
  }),

};
