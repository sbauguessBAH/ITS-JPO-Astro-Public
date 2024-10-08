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

  training: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string().optional()
      }),
      url: z.string().url().optional()
    })
  }),
  trainingCategory: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      trainings: z.array(reference('training'))
    })
  }),
  microlearnings: defineCollection({
    type: 'data',
    schema: z.array(z.object({
      title: z.string(),
      trainings: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.object({
          src: z.string(),
          alt: z.string()
        }).optional(),
        url: z.string().url().optional(),
        isExternal: z.boolean().optional()
      }))
    }))
  }),
  trainings: defineCollection({
    type: 'data',
    schema: z.array(z.object({
      title: z.string(),
      trainings: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.object({
          src: z.string(),
          alt: z.string()
        }).optional(),
        url: z.string().url().optional(),
        isExternal: z.boolean().optional()
      }))
    }))
  })

};
