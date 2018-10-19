import printSegment from './printSegment';
import { AnyPathSegment } from './parsePath';

export default function printPath(segments: Array<AnyPathSegment>): string {
  return segments.map(printSegment).join('.');
}
