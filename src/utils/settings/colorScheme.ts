import type { ColorScheme } from '$/types/config'

import { DEFAULT_COLOR_SCHEME } from '$/constants/constants.ts'

function isValidColorScheme(value: string): value is ColorScheme {
  return ['light', 'dark', 'auto'].includes(value)
}

export function getColorScheme() {
  const stored = localStorage.getItem('colorScheme')
  return stored !== null && isValidColorScheme(stored)
    ? stored
    : DEFAULT_COLOR_SCHEME
}

export function setColorScheme(colorScheme: ColorScheme) {
  localStorage.setItem('colorScheme', colorScheme)
  applyColorScheme(colorScheme)
}

export function applyColorScheme(colorScheme: ColorScheme = getColorScheme()) {
  document.documentElement.dataset.colorScheme
    = getComputedColorScheme(colorScheme)
}

export function getComputedColorScheme(colorScheme: ColorScheme) {
  return colorScheme === 'auto'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : colorScheme
}
