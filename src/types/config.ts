import type { Hue } from './theme'

/**
 * Returns the argument unchanged.
 *
 * This is useful for enabling type checking on default exports.
 *
 * @template T The type of the parameter.
 * @param value Any value.
 * @returns The argument, unchanged.
 */
export function config<T>(value: T) {
  return value
}

/** Site-wide configuration. */
export interface Config {
  /** The URL of the site. */
  readonly url: string

  /** The title of the site. */
  readonly title: string

  /** The subtitle of the site. */
  readonly subtitle: string

  /** The URL to the site's source code, if it's public. */
  readonly sourceURL?: string

  /** The default hue, from 0 to 359. */
  readonly defaultHue: Hue

  /**
   * Configuration for the site-wide banner.
   *
   * Omit this property to disable the banner.
   */
  readonly banner?: BannerConfig

  /**
   * Configuration for the table of contents on the right side of the page.
   *
   * Omit this property to disable the table of contents.
   */
  readonly toc?: TOCConfig

  /** Configuration for the navbar. */
  readonly navbar: NavBarConfig

  /** Configuration for the author's profile. */
  readonly profile: ProfileConfig

  /**
   * Configuration for post licenses.
   *
   * Omit this property to disable the license card.
   */
  readonly license?: LicenseConfig
}

/** Configuration for the site-wide banner. */
export interface BannerConfig {
  /**
   * The path to the banner image.
   *
   * Relative to `/src`, or to `/public` if it's an absolute path.
   */
  readonly src: string

  /**
   * The value of the banner's `object-position` property.
   *
   * @default 'center'
   */
  readonly position?: 'top' | 'center' | 'bottom'

  /**
   * Configuration for the banner attribution link.
   *
   * Omit this property to disable the attribution link.
   */
  readonly credit?: BannerCreditConfig
}

/** Configuration for the banner attribution link. */
export interface BannerCreditConfig {
  /** The name of the person who created the banner image. */
  readonly text: string

  /** A link to the original image. */
  readonly url: string
}

/** Configuration for the table of contents on the right side of the page. */
export interface TOCConfig {
  /** The maximum heading depth to show in the table of contents. */
  readonly depth: 1 | 2
}

/** A navbar link. */
export interface NavBarLink {
  /** The name of this navbar link. */
  readonly name: string

  /** The URL of this navbar link. */
  readonly url: string

  /**
   * Whether this navbar link leads to an external site.
   *
   * @default false
   */
  readonly external?: boolean
}

/** Configuration for the navbar. */
export interface NavBarConfig {
  /** A list of navbar links. */
  readonly links: readonly NavBarLink[]
}

/** Configuration for the author's profile. */
export interface ProfileConfig {
  /** The path to the author's profile picture. Relative to `/src`. */
  readonly avatar: string

  /** The author's name. */
  readonly name: string

  /** The author's bio. */
  readonly bio: string

  /** Links to the author's social profiles. */
  readonly links: readonly ProfileLink[]
}

/** A link to a social profile. */
export interface ProfileLink {
  /** The name of this service. */
  readonly name: string

  /** The URL to the author's profile on this service. */
  readonly url: string

  /** The icon of this service. */
  readonly icon: string
}

/** Configuration for post licenses. */
export interface LicenseConfig {
  /** The name of the license. */
  readonly name: string

  /** The URL to the license. */
  readonly url: string
}
