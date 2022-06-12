import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'esbuild-postcss';

export default defineConfig({
  entry: ['src/index.tsx'],
  esbuildPlugins: [sassPlugin(), postcss()],
});
