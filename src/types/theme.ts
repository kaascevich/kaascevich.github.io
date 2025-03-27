import type { NumsUpTo } from './misc'

/** A list of color schemes. */
export const colorSchemes = ['light', 'dark', 'auto'] as const

/** A color scheme. */
export type ColorScheme = typeof colorSchemes[number]

/** A hue value. */
export type Hue = NumsUpTo<360>[number]
