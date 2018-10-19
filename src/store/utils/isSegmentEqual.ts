import { AnyPathSegment } from './parsePath';

export default function isSegmentEqual(
  left: AnyPathSegment,
  right: AnyPathSegment
): boolean {
  if (left.name !== right.name || left.type !== right.type) return false;
  if (left.type === 'index' && right.type === 'index') {
    if (left.index !== right.index) return false;
  }

  return true;
}
