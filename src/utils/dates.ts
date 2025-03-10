/** Formats the given date. */
export function formatDate(date: Readonly<Date>) {
  const format = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return format.format(date)
}
