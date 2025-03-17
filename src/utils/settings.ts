import type { ColorScheme, Hue } from '$/types/config'

import siteConfig from '$/config/site'
import { DEFAULT_COLOR_SCHEME } from '$/constants/constants.ts'
import * as R from 'remeda'

function isValidHue(value: number | null): value is Hue {
  return value !== null && value >= 0 && value < 360
}

function isValidColorScheme(value: string | null): value is ColorScheme {
  return value !== null && ['light', 'dark', 'auto'].includes(value)
}

export function getHue(): Hue {
  const stored = R.pipe(
    localStorage.getItem('hue') ?? 'NaN',
    Number.parseInt,
  )
  return isValidHue(stored) ? stored : siteConfig.defaultHue
}

export function setHue(hue: Hue) {
  localStorage.setItem('hue', String(hue))
  document.documentElement.style.setProperty('--hue', String(hue))
}

export function getColorScheme() {
  const stored = localStorage.getItem('colorScheme')
  return isValidColorScheme(stored) ? stored : DEFAULT_COLOR_SCHEME
}

export function setColorScheme(colorScheme: ColorScheme) {
  localStorage.setItem('colorScheme', colorScheme)
  applyColorScheme(colorScheme)
}

export function applyColorScheme(colorScheme: ColorScheme) {
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
