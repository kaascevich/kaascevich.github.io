import type { DeepReadonly } from "./misc"

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
export type SiteConfig = DeepReadonly<{
  /** The URL of the site. */
  url: string
  /** The title of the site. */
  title: string
  /** The subtitle of the site. */
  subtitle: string

  /** The default theme color, from 0 to 360. */
  themeColor: number

  /** Configuration for the site-wide banner. */
  banner: {
    /** Whether to enable the site-wide banner. */
    enable: boolean
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
    position: "top" | "center" | "bottom"
    /** Configuration for the banner attribution link. */
    credit: {
      /** Whether to show an attribution link for the banner image. */
      enable: boolean
      /** The name of the person who created the banner image. */
      text: string
      /** A link to the original image. */
      url?: string | undefined
    }
  }
  /** Configuration for the table of contents. */
  toc: {
    /** Whether to show the table of contents on the right side of the page. */
    enable: boolean
    /** The maximum heading depth to show in the table of contents. */
    depth: 1 | 2 | 3
  }
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

/** Navbar configuration. */
export type NavBarConfig = DeepReadonly<{
  /** A list of navbar links. */
  links: NavBarLink[]
}>

/** Profile configuration. */
export type ProfileConfig = DeepReadonly<{
  /** The path to the author's profile picture. Relative to `/src`. */
  avatar: string
  /** The author's name. */
  name: string
  /** The author's bio. */
  bio: string
  /** Links to the author's social profiles. */
  links: {
    /** The name of this service. */
    name: string
    /** The URL to the author's profile on this service. */
    url: string
    /** The icon of this service. */
    icon: string
  }[]
}>

/** License configuration. */
export type LicenseConfig = DeepReadonly<{
  /** Whether to enable post licenses. */
  enable: boolean
  /** The name of the license. */
  name: string
  /** The URL to the license. */
  url: string
}>

export type ColorScheme = "light" | "dark" | "auto"

/** A list of strings. */
export type StringList = Record<
  string,
  Record<string, string | ((...args: never[]) => string)>
>
