export interface TranslateOptions {
  csrfParams?: { [name: string]: string };
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

  const { endpoint, csrfParams = {}, ...baseParams } = options;
  const params: { [key: string]: string } = {
    ...baseParams,
    ...csrfParams,
    text,
  };

  const body = new FormData();
  Object.keys(params).forEach((key) => body.append(key, params[key]));

  return new Promise<string>((resolve) => {
    fetch(endpoint, {
      body,
      method: 'post',
    })
      .then((value) => value.json())
      .then((value) => {
        resolve(value && value.data ? value.data : text);
      })
      .catch((error) => {
        console.error(`Translator returned an error: ${error}`);
        errorCount += 1;
        resolve(text);
      });
  });
}
