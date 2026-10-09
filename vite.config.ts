import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { staticRoutes } from './scripts/static-routes.ts';

// GitHub Pages serves this repo at https://afsartanvir.github.io/Portfolio/.
// If the site moves to a user page (AfsarTanvir.github.io) or a custom domain,
// build with BASE_PATH=/ instead.
const base = process.env.BASE_PATH ?? '/Portfolio/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), staticRoutes()],
  build: {
    rolldownOptions: {
      output: {
        // Libraries change rarely; keep them in their own long-cached chunk so
        // content edits only invalidate the small app chunk.
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
            },
            {
              name: 'motion',
              test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/,
            },
          ],
        },
      },
    },
  },
});
