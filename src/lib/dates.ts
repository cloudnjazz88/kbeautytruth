/** Display timezone for publication calendar dates (Kay publishes in US Eastern). */
export const siteTimeZone = 'America/New_York';

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: siteTimeZone,
});

const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: siteTimeZone,
});

export function formatShortDate(date: Date): string {
  return shortDateFormatter.format(date);
}

export function formatLongDate(date: Date): string {
  return longDateFormatter.format(date);
}
