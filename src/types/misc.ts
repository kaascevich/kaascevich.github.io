export type NumsUpTo<
  N extends number,
  A extends number[] = [],
> = A['length'] extends N ? A : NumsUpTo<N, [...A, A['length']]>
