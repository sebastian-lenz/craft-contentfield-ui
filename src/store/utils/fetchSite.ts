import { Model, Reference } from '../models';

export interface FetchSiteOptions {
  apiEndpoint: string;
  elementId: number;
  fieldHandle: string;
  siteId: number;
}

export interface FetchSiteResult {
  data: Model;
  references: Array<Reference>;
}

export function isFetchSiteResult(value: any): value is FetchSiteResult {
  return (
    typeof value === 'object' &&
    typeof value.data === 'object' &&
    value.result === true &&
    Array.isArray(value.references)
  );
}

export default function fetchSite({
  apiEndpoint,
  ...params
}: FetchSiteOptions): Promise<FetchSiteResult> {
  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join('&');

  return new Promise((resolve, reject) => {
    fetch(`${apiEndpoint}&${query}`)
      .then(value => value.json())
      .then(value => {
        if (isFetchSiteResult(value)) {
          resolve(value);
        } else {
          reject(
            value && value.message
              ? `${value.message}`
              : 'An unknown error has occured.'
          );
        }
      })
      .catch(error => {
        reject(`${error}`);
      });
  });
}
