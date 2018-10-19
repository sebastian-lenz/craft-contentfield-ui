import { AnyPathSegment } from './parsePath';

export default function printSegment(segment: AnyPathSegment): string {
  return segment.type === 'property'
    ? segment.name
    : `${segment.name}[${segment.index}]`;
}
