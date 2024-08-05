import { createUrl } from './createUrl';
import type { Config, Reference } from '../models';

export interface TryFetchReferenceOptions {
  config: Config;
  references: Array<Reference>;
  sourceSiteId: number | null;
  targetSiteId: number | null;
}

export async function translateReferenceSiteId(
  elementId: number,
  siteId: number,
  { config, references, sourceSiteId, targetSiteId }: TryFetchReferenceOptions
): Promise<number> {
  if (siteId !== sourceSiteId || !targetSiteId) {
    return siteId;
  }

  const reference = references.find(
    (ref) => ref.id === elementId && ref.siteId === targetSiteId
  );

  if (!reference) {
    try {
      const response = await fetch(
        createUrl(config.apiEndpoints.reference, {
          id: elementId,
          siteId: targetSiteId,
        })
      );

      references.push(await response.json());
    } catch (error) {
      return siteId;
    }
  }

  return targetSiteId;
}
