import type { AstroIntegration } from "@swup/astro"

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Window {
    // type from '@swup/astro' is incorrect
    swup: AstroIntegration
  }
}
