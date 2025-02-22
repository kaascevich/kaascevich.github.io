/**
 * Recursively makes all properties in `T` `readonly`.
 *
 * This type differs from the TypeScript `Readonly<T>` builtin in that it also
 * makes all arrays and all properties of non-function objects _inside_ of `T`
 * `readonly`, recursively. This results in a type that is about as immutable as
 * you can get in TypeScript.
 *
 * This type does not affect function properties inside of `T` or its properties
 * in order to ensure they're still callable as functions.
 *
 * @template T Any type.
 *
 * @example
 * type SomeType = {
 *   obj: { x: string }
 *   arr: number[]
 * }
 * const shallowReadonly: Readonly<SomeType> = { ... }
 * const deepReadonly: DeepReadonly<SomeType> = { ... }
 *
 * shallowReadonly.obj = { x: "goodbye" } // error: 'obj' is a read-only property
 * deepReadonly.obj = { x: "goodbye" }    // error: 'obj' is a read-only property
 *
 * shallowReadonly.obj.x = "goodbye" // no error
 * deepReadonly.obj.x = "goodbye"    // error: 'x' is a read-only property
 *
 * shallowReadonly.arr[1] = 42 // no error
 * deepReadonly.arr[1] = 42    // error: index signature only permits reading
 */
export type DeepReadonly<T> =
  T extends (...args: unknown[]) => unknown ? T
  : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T
