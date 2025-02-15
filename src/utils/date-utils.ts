export function formatDateToYYYYMMDD(date: Readonly<Date>): string {
  return date.toISOString().substring(0, 10)
}
