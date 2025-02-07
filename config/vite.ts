import type { ViteUserConfig } from "astro"

import svgr from "vite-plugin-svgr"

import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const filename = fileURLToPath(import.meta.url)
const srcPath = resolve(dirname(filename), "../src")

export default {
  plugins: [svgr()],
  optimizeDeps: { exclude: ["@resvg/resvg-js"] },
  resolve: { alias: { "@/": `${srcPath}/` } },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
        @use "sass:color"
        @use "sass:math"
        @use "@/styles/variables/chars.sass"
        @use "@/styles/variables/colors.sass"
        @use "@/styles/variables/font-weights.sass"
        @use "@/styles/functions.sass" as *
        @use "@/styles/mixins.sass" as *
        `,
        silenceDeprecations: ["mixed-decls"],
      },
    },
    preprocessorMaxWorkers: true,
  },
} satisfies ViteUserConfig
