import type { Hue } from '$/types/config'

import siteConfig from '$/config/site'
import * as R from 'remeda'

function isValidHue(value: number | null): value is Hue {
  return value !== null && value >= 0 && value < 360
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
  applyHue()
}

export function applyHue(hue: Hue = getHue()) {
  document.documentElement.style.setProperty('--hue', String(getHue()))
}
