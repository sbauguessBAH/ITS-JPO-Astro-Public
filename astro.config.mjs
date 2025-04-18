import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc. 
  base: 'itstest',
  output: 'static',
  experimental: {
    contentLayer: true,
  }
});

