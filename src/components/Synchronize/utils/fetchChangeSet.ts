import { Model, Reference } from '../../../store/models';
import { ChangeSet } from './createChangeSet';

export interface FetchChangeSetOptions {
  apiEndpoint: string;
  elementId: number;
  fieldHandle: string;
  model: Model;
  siteId: number;
}

export interface FetchResult {
  result: true;
  data: Model;
  references: Array<Reference>;
}

export function isFetchResult(value: any): value is FetchResult {
  return (
    typeof value === 'object' &&
    typeof value.data === 'object' &&
    value.result === true &&
    Array.isArray(value.references)
  );
}

export default function fetchChangeSet({
  apiEndpoint,
  ...params
}: FetchChangeSetOptions): Promise<ChangeSet> {
  const { siteId } = params;
  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent((params as any)[key])}`)
    .join('&');

  return new Promise(resolve => {
    fetch(`${apiEndpoint}&${query}`)
      .then(value => value.json())
      .then(value => {
        if (isFetchResult(value)) {
          resolve({
            result: true,
            siteId,
          });
        } else {
          resolve({
            message:
              value && value.message
                ? `${value.message}`
                : 'An unknown error has occured.',
            result: false,
            siteId,
          });
        }
      })
      .catch(error => {
        resolve({
          message: `${error}`,
          result: false,
          siteId,
        });
      });
  });
}
