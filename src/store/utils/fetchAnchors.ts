export interface AnchorData {
  anchor: string;
  id?: string;
  title?: string;
}

export interface FetchAnchorsOptions {
  apiEndpoint: string;
  elementId: number;
  siteId?: number | null;
}

export interface FetchAnchorsResult {
  anchors: Array<AnchorData>;
}

export function isFetchAnchorsResult(value: any): value is FetchAnchorsResult {
  return (
    typeof value === 'object' &&
    value.result === true &&
    Array.isArray(value.anchors)
  );
}

export default function fetchAnchors({
  apiEndpoint,
  ...params
}: FetchAnchorsOptions): Promise<FetchAnchorsResult> {
  const query = Object.keys(params)
    .filter((key) => !!(params as any)[key])
    .map((key) => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join('&');

  return new Promise((resolve, reject) => {
    fetch(`${apiEndpoint}&${query}`)
      .then((value) => value.json())
      .then((value) => {
        if (isFetchAnchorsResult(value)) {
          resolve(value);
        } else {
          reject(
            value && value.message
              ? `${value.message}`
              : 'An unknown error has occured.'
          );
        }
      })
      .catch((error) => {
        reject(`${error}`);
      });
  });
}
