import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: change `site` to the final domain before launch.
// It is used for canonical URLs, Open Graph tags and the sitemap.
export default defineConfig({
  site: 'https://rkissooncontracting.netlify.app',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you/'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
