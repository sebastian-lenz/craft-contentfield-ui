export interface IndexPathSegment {
  index: number;
  name: string;
  type: 'index';
}

export interface PropertyPathSegment {
  name: string;
  type: 'property';
}

export type AnyPathSegment = IndexPathSegment | PropertyPathSegment;

export default function parsePath(path: string): Array<AnyPathSegment> {
  const result: Array<AnyPathSegment> = [];
  let remaining = path;

  while (remaining.length) {
    const match = /^([^\[\.]+)(?:\[(\d+)\])?\.?/.exec(remaining);
    if (!match) {
      throw new Error(`Invalid path segment "${remaining}" in path "${path}".`);
    }

    remaining = remaining.substr(match[0].length);

    if (match.length === 3) {
      result.push({
        index: parseInt(match[1]),
        name: match[2],
        type: 'index',
      });
    } else {
      result.push({
        name: match[1],
        type: 'property',
      });
    }
  }

  return result;
}
