import type { ColorScheme, Hue } from '$/types/config'

import siteConfig from '$/config/site'
import { DEFAULT_COLOR_SCHEME } from '$/constants/constants.ts'

function isValidHue(value: number | null): value is Hue {
  return value !== null && value >= 0 && value < 360
}

function isValidColorScheme(value: string | null): value is ColorScheme {
  return value !== null && ['light', 'dark', 'auto'].includes(value)
}

export function getHue(): Hue {
  const stored = Number.parseInt(localStorage.getItem('hue') ?? 'NaN')
  return isValidHue(stored) ? stored : siteConfig.defaultHue
}

export function setHue(hue: Hue): void {
  localStorage.setItem('hue', String(hue))
  document.documentElement.style.setProperty('--hue', String(hue))
}

export function applyColorScheme(colorScheme: ColorScheme): void {
  document.documentElement.dataset.colorScheme
    = colorScheme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : colorScheme
}

export function setColorScheme(colorScheme: ColorScheme): void {
  localStorage.setItem('colorScheme', colorScheme)
  applyColorScheme(colorScheme)
}

export function getStoredColorScheme(): ColorScheme {
  const stored = localStorage.getItem('colorScheme')
  return isValidColorScheme(stored) ? stored : DEFAULT_COLOR_SCHEME
}
