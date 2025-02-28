import { vitePreprocess } from "@astrojs/svelte"

export default {
  preprocess: [vitePreprocess({ script: true, style: true })],

  /**
   * @typedef {{ code: string }} Warning
   *
   * @param {Warning} warning
   * @param {(warning: Warning) => void} handler
   */
  onwarn: (warning, handler) => {
    if (
      warning.code === "css_unused_selector" ||
      warning.code === "vite-plugin-svelte-preprocess-many-dependencies"
    ) {
      return
    }

    handler(warning)
  },
}
