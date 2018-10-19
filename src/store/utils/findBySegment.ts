import { Model } from '../models';
import { AnyPathSegment } from './parsePath';

export default function findBySegment(
  scope: Model,
  segment: AnyPathSegment
): Model | null {
  if (!(segment.name in scope)) {
    return null;
  }

  const target = scope[segment.name];

  if (segment.type === 'index') {
    if (
      !Array.isArray(target) ||
      segment.index < 0 ||
      segment.index >= target.length
    ) {
      return null;
    }

    return target[segment.index];
  }

  return target;
}
