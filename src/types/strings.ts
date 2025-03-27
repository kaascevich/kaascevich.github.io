type Stringable = string | ((...args: never[]) => string)

/** A list of strings. */
export interface StringList {
  readonly [key: string]: Stringable | StringList
}
