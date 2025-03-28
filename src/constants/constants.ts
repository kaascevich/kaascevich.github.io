import type { ColorScheme } from '$/types/theme'

export const NAVBAR_HEIGHT = 72

export const PAGE_SIZE = 1

export const DEFAULT_COLOR_SCHEME = 'auto' satisfies ColorScheme

export const BANNER_HEIGHT = 35 // vh
export const BANNER_HEIGHT_EXTEND = 30
export const BANNER_HEIGHT_HOME = BANNER_HEIGHT + BANNER_HEIGHT_EXTEND

export const MAIN_PANEL_OVERLAPS_BANNER_HEIGHT = 3.5 // rem
// the height the main panel overlaps the banner
export const MAIN_PANEL_EXCESS_HEIGHT = MAIN_PANEL_OVERLAPS_BANNER_HEIGHT * 16

export const PAGE_WIDTH = 75 // rem
