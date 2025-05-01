import { imageConfig } from "astro:assets";
import { z, defineCollection, reference } from "astro:content";

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

  standards: defineCollection({
    type: 'data',
    schema: z.array(
      z.object({
        title: z.string(),
        code: z.string(),
        organization: z.string(),
        description: z.string().optional(),
        url: z.string().optional(),
        isExternal: z.boolean().optional(),
        category: z.string().optional()
      })
    )
  }),

  microlearning: defineCollection({
    type: 'data',
    schema: ({ image }) => z.array(
      z.object({
        title: z.string(),
        trainings: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            image: image().optional(),
            url: z.string().url().optional(),
            isExternal: z.boolean().optional()
          })
        )
      })
    )
  }),
  trainings: defineCollection({
    type: 'data',
    schema: ({ image }) => z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: image().optional(),
        alt: z.string().optional(),
        url: z.string().optional(),
        isExternal: z.boolean().optional(),
        category: z.string(),
        type: z.string(),
        action: z.string().optional()
      })
    )
  }),
  standardsTrainings: defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
      title: z.string(),
      code: z.string(),
      module: z.number(),
      length: z.string()
    }),
  }),
  pcb: defineCollection({
    type: 'content', // v2.5.0 and later
    schema: ({ image }) => z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      order: z.number().int()   
    }),
  }),

};
