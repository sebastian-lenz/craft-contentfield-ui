import { Reference, ReferenceValue } from '../../store/models';

export function referenceEuqals(
  lft: Reference | ReferenceValue,
  rgt: Reference | ReferenceValue
): boolean {
  return lft.id == rgt.id && lft.siteId == rgt.siteId;
}

export function isReferenceValue(value: any): value is ReferenceValue {
  return (
    typeof value === 'object' &&
    'id' in value &&
    'siteId' in value &&
    typeof value.id == 'number' &&
    typeof value.siteId == 'number'
  );
}
