import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://abdulazizoner.github.io',
  output: 'static',
  outDir: './docs',
  build: {
    format: 'file',
  },
});
