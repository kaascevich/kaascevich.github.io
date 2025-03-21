import type { Hue } from '$/types/config'

import siteConfig from '$/config/site'
import { pipe } from 'remeda'

function isValidHue(value: number): value is Hue {
  return Number.isInteger(value) && value >= 0 && value < 360
}

export function getHue(): Hue {
  const stored = pipe(
    localStorage.getItem('hue') ?? 'NaN',
    Number.parseInt,
  )
  return stored !== null && isValidHue(stored) ? stored : siteConfig.defaultHue
}

export function setHue(hue: Hue) {
  localStorage.setItem('hue', String(hue))
  applyHue()
}

export function applyHue(hue: Hue = getHue()) {
  document.documentElement.style.setProperty('--hue', String(hue))
}
