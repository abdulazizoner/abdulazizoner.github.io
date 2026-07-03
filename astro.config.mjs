import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://abdulazizoner.github.io',
  base: '/Aonware.ai',
  output: 'static',
  outDir: './docs',
  build: {
    format: 'file',
  },
});
