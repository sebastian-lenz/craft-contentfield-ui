import { AnyPathSegment } from './parsePath';
import isSegmentEqual from './isSegmentEqual';

export default function isPathEqual(
  left: Array<AnyPathSegment>,
  right: Array<AnyPathSegment>
): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((segment, index) => isSegmentEqual(segment, right[index]));
}
