import { vitePreprocess } from "@astrojs/svelte"

export default {
  preprocess: [vitePreprocess({ script: true, style: true })],
  onwarn: (warning, handler) => {
    if (
      ![
        "css_unused_selector",
        "vite-plugin-svelte-preprocess-many-dependencies",
      ].includes(warning.code)
    ) {
      handler(warning)
    }
  },
}
