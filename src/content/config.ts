import { imageConfig } from "astro:assets";
import { z, defineCollection, reference } from "astro:content";
import { fetchWebinarData } from "../lib/parse_its4us";

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
  publications: defineCollection({
    loader: async () => {
      const data = await fetchWebinarData("src/data/ITS4US_Database.xlsx");
      return data;
    },
    schema: z.object({
      id: z.string(),
      resource_title: z.string(),
      publication_code: z.string().nullable(),
      task_name: z.string(),
      awardee_deployment: z.string(),
      phase: z.number(),
      date: z.date().nullable(),
      type: z.string().default("Unknown"), // Deal with this because it shouldn't be null but it might be parsing undefined or an empty string
      keywords: z.array(z.string()),
      links: z.array(z.object({ 
        title: z.string(), 
        type: z.union([
          z.literal("external"), 
          z.literal("download"),
        ]),
        href: z.string()
      }))
    })
  })
};