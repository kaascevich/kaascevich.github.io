import type { Theme } from "@/types/config"

export const UNCATEGORIZED = "__uncategorized__"

export const PAGE_SIZE = 8

export const DEFAULT_THEME = "auto" satisfies Theme

// Banner height unit: vh
export const BANNER_HEIGHT = 35
export const BANNER_HEIGHT_EXTEND = 30
export const BANNER_HEIGHT_HOME = BANNER_HEIGHT + BANNER_HEIGHT_EXTEND

// The height the main panel overlaps the banner, unit: rem
export const MAIN_PANEL_OVERLAPS_BANNER_HEIGHT = 3.5

// Page width: rem
export const PAGE_WIDTH = 75
