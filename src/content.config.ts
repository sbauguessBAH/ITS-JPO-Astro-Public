/* eslint-disable perfectionist/sort-objects */
import { file, glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// #region ITS JPO
/**
 * General ITS JPO
 * 
 * - News Posts
 * - Director's Blog
 * - Infographics
 */

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),      
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),      
  }),
});

const infographics = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    catagory: z.string(),
  }),
});

// #endregion
// #region PCB
/**
 * Professional Capacity Building (PCB)
 * 
 * - Microlearning Videos List
 * - Training List
 * - Standards Training Entries
 * - Transit Standards Training Entries
 */

const pcbMicrolearning = defineCollection({
  loader: file('src/content/pcb/microlearning/microlearning.json'),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    trainings: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: image().optional(),
        url: z.string().url().optional(),
        isExternal: z.boolean().optional()
      })
    )
  }),
});

const pcbTrainings = defineCollection({
  loader: file('src/content/pcb/trainings/all/trainings.json'),
  schema: ({ image }) => z.object({
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
});

const pcbStandardsTrainings = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pcb/trainings/standards' }),
  schema: z.object({
    title: z.string(),
    code: z.string(),
    module: z.number(),
    length: z.string(),
    presentation: z.string().optional(),
    supplement: z.string().optional(),
    transcript: z.string().optional(),
    chat: z.string().optional()
  }),
});

const pcbTransitStandardsTrainings = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pcb/trainings/transit-standards' }),
  schema: z.object({
    title: z.string(),
    module: z.number(),
    length: z.string(),
    presentation: z.string().optional(),
    supplement: z.string().optional(),
    transcript: z.string().optional(),
    chat: z.string().optional()
  }),
});

// #endregion
// #region ASC
/**
 * Architecture, Standards, and Cybersecurity (ASC)
 * 
 * - Standards List
 */

// const ascStandards = defineCollection({
//   loader: file('src/content/asc/v2x.json'),
//   schema: z.object({
//     title: z.string(),
//     code: z.string(),
//     organization: z.string(),
//     description: z.string().optional(),
//     url: z.string().optional(),
//     isExternal: z.boolean().optional(),
//     category: z.string().optional()
//   })
// });

// #endregion
// #region Automation
/**
 * Automation Program
 * 
 * - Resources
 */

const automationResources = defineCollection({
  loader: file('src/content/automation/resources.json'),
  schema: z.object({
    area: z.string(),
    deliverable: z.string(),
    project: z.string(),
    url: z.string().url(),
    year: z.number().int()
  })
});

// #endregion
// #region Export

/** Export of all content collections */
export const collections = {
  posts,
  blog,
  infographics,
  pcbMicrolearning,
  pcbTrainings,
  pcbStandardsTrainings,
  pcbTransitStandardsTrainings,
  // ascStandards,
  automationResources
};
// #endregion
