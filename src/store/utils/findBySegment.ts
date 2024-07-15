import { AnyPathSegment } from './parsePath';

export default function findBySegment(
  scope: any,
  segment: AnyPathSegment
): any | null {
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
