export interface TranslateOptions {
  endpoint: string;
  source: string;
  target: string;
}

let errorCount = 0;

export default async function fetchTranslation(
  text: string,
  options: TranslateOptions
): Promise<string> {
  if (errorCount > 2) {
    console.warn(
      `Translator has returned to many errors, skipping translation for text "${text}".`
    );
    return text;
  }

  const { endpoint, ...baseParams } = options;
  const params = { ...baseParams, text };
  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join('&');

  return new Promise<string>(resolve => {
    fetch(`${endpoint}&${query}`)
      .then(value => value.json())
      .then(value => {
        resolve(value && value.data ? value.data : text);
      })
      .catch(error => {
        console.error(`Translator returned an error: ${error}`);
        errorCount += 1;
        resolve(text);
      });
  });
}
