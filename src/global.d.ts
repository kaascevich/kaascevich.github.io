import type Swup from 'swup'

declare global {
  interface Window {
    swup: Swup
  }
}

declare global {
  interface NumberConstructor {
    <T extends `${number}`>(value: T): T extends `${infer N extends number}`
      ? N
      : number // NaN
    <T extends bigint>(value: T): `${T}` extends `${infer N extends number}`
      ? N
      : never

    (value: null): 0
    // undefined -> NaN

    (value: true): 1
    (value: false): 0
    (value: symbol): never // TypeError
  }

  interface BooleanConstructor {
    (value?: undefined | null | 0 | 0n | ''): false

    (value: object | string | bigint | symbol): true
    (value: number): boolean // if only we could express NaN in the type system...
  }

  interface StringConstructor {
    <T>(value?: T): `${T}`
  }

  interface BigIntConstructor {
    <T extends number | `${bigint}`>(value: T):
      `${T}` extends `${infer N extends bigint}` ? N : never

    (value?: null | undefined | symbol): never // TypeError
    (value: true): 1n
    (value: false): 0n
  }
}
