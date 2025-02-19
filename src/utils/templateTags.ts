/**
 * Returns the given template literal unchanged.
 *
 * This is useful for adding syntax highlighting to template literals.
 *
 * @returns The given template literal unchanged.
 */
export default (
  strings: readonly string[],
  ...values: readonly unknown[]
): string => String.raw({ raw: strings }, ...values)
