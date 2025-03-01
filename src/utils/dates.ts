/** Formats the given date in the form `YYYY-MM-DD`. */
export function formatDate(date: Readonly<Date>): string {
  // return date.toISOString().substring(0, 10)
  const format = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return format.format(date)
}
