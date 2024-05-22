export function createUrl(url: string, params: {}): string {
  const glue = url.indexOf('?') === -1 ? '?' : '&';
  const query = Object.keys(params)
    .filter((key) => !!(params as any)[key])
    .map((key) => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join('&');

  return `${url}${glue}${query}`;
}
