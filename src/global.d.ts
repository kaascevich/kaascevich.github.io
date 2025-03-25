import type Swup from 'swup'
import type { Pagefind } from 'vite-plugin-pagefind/types'

declare global {
  interface Window {
    swup: Swup | undefined
    pagefind: Pagefind | undefined
  }
}
