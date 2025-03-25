/**
 * Waits for the given number of milliseconds before resuming execution.
 *
 * This is simply an `async` wrapper to `setTimeout`.
 *
 * @param milliseconds The number of milliseconds to wait for.
 */
export async function sleep(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds))
}
