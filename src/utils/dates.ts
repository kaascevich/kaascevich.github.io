/** Formats the given date in the form `YYYY-MM-DD`. */
export function formatDate(date: Readonly<Date>): string {
  return date.toISOString().substring(0, 10)
}
