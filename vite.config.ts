import * as path from 'path';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';
import { browserslistToTargets } from 'lightningcss';

// @ts-expect-error types file not declare in `exports` field
import browserslist from 'browserslist';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../build',
    cssMinify: 'lightningcss',
  },
  server: {
    port: 3000,
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist()),
    },
  },
  plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      svgo: {
        plugins: [
          { name: 'RemoveTitle', active: false },
          { name: 'RemoveDescription', active: false },
          { name: 'RemoveViewBox', active: false },
          { name: 'removeDimensions', active: true },
          { name: 'removeScriptElement', active: true },
          { name: 'removeStyleElement', active: true },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
    }),
  ],
});
