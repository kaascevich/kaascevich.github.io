import type { AstroIntegration } from "@swup/astro"

declare global {
  type Window = {
    // type from '@swup/astro' is incorrect
    swup: AstroIntegration
  }
}
