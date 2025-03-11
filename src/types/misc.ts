export type NumsUpTo<
  N extends number,
  A extends number[] = [],
> = A['length'] extends N ? A : NumsUpTo<N, [...A, A['length']]>

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & { }
