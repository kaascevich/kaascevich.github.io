import type { DeepReadonly } from './misc'

/**
 * Returns the argument unchanged.
 *
 * This is useful for enabling type checking on default exports.
 *
 * @template T The type of the parameter.
 * @param value Any value.
 * @returns The argument, unchanged.
 */
export function config<T>(value: T): T {
  return value
}

/** Site-wide configuration. */
export type Config = DeepReadonly<{
  /** The URL of the site. */
  url: string
  /** The title of the site. */
  title: string
  /** The subtitle of the site. */
  subtitle: string
  /** The default hue, from 0 to 360. */
  defaultHue: number
  /** Configuration for the site-wide banner. */
  banner?: BannerConfig | undefined
  /** Configuration for the table of contents on the right side of the page. */
  toc?: TOCConfig | undefined
  /** Configuration for the navbar. */
  navbar: NavBarConfig
  /** Configuration for the author's profile. */
  profile: ProfileConfig
  /** Configuration for post licenses. */
  license?: LicenseConfig | undefined
}>

/** Configuration for the site-wide banner. */
export type BannerConfig = DeepReadonly<{
  /**
   * The path to the banner image.
   *
   * Relative to `/src`, or to `/public` if it's an absolute path.
   */
  src: string

  /**
   * The value of the banner's `object-position` property.
   *
   * Defaults to `center`.
   */
  position: 'top' | 'center' | 'bottom'

  /** Configuration for the banner attribution link. */
  credit?: BannerCreditConfig | undefined
}>

/** Configuration for the banner attribution link. */
export type BannerCreditConfig = DeepReadonly<{
  /** The name of the person who created the banner image. */
  text: string

  /** A link to the original image. */
  url: string
}>

/** Configuration for the table of contents on the right side of the page. */
export type TOCConfig = DeepReadonly<{
  /** The maximum heading depth to show in the table of contents. */
  depth: 1 | 2 | 3
}>

/** A navbar link. */
export type NavBarLink = DeepReadonly<{
  /** The name of this navbar link. */
  name: string

  /** The URL of this navbar link. */
  url: string

  /** Whether this navbar link leads to an external site. */
  external?: boolean | undefined
}>

/** Configuration for the navbar. */
export type NavBarConfig = DeepReadonly<{
  /** A list of navbar links. */
  links: NavBarLink[]
}>

/** Configuration for the author's profile. */
export type ProfileConfig = DeepReadonly<{
  /** The path to the author's profile picture. Relative to `/src`. */
  avatar: string

  /** The author's name. */
  name: string

  /** The author's bio. */
  bio: string

  /** Links to the author's social profiles. */
  links: ProfileLink[]
}>

/** A link to a social profile. */
export type ProfileLink = DeepReadonly<{
  /** The name of this service. */
  name: string

  /** The URL to the author's profile on this service. */
  url: string

  /** The icon of this service. */
  icon: string
}>

/** Configuration for post licenses. */
export type LicenseConfig = DeepReadonly<{
  /** The name of the license. */
  name: string

  /** The URL to the license. */
  url: string
}>

export type ColorScheme = 'light' | 'dark' | 'auto'

/** A list of strings. */
export type StringList = Record<
  string,
  Record<string, string | ((...args: never[]) => string)>
>
