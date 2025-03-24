import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind'

import partytown from '@astrojs/partytown';


// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc. 
  base: '',

  output: 'static',
  integrations: [partytown(), pagefind()],
});