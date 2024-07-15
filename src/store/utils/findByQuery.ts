import { findParents } from './findParents';
import { matchesQualifier } from './matchesQualifier';
import type { Model, RootState } from '../models';

interface Match {
  distance: number;
  model: Model;
}

function queryChildren(
  state: RootState,
  matches: Array<Match>,
  segment: string
): Array<Match> {
  return matches.reduce((result, match) => {
    return result;
  }, [] as Array<Match>);
}

function queryParents(
  state: RootState,
  matches: Array<Match>,
  segment: string
): Array<Match> {
  return matches.reduce((result, match) => {
    const parents = findParents(state, match.model).reverse();
    const index = parents.findIndex((parent) =>
      matchesQualifier(parent.__type, segment)
    );

    if (index === -1) return result;
    return [
      ...result,
      { model: parents[index], distance: match.distance + index },
    ];
  }, [] as Array<Match>);
}

const handlers = [
  { prefix: '\\\\', handler: queryParents },
  { prefix: '\\', handler: queryChildren },
];

export function findFieldByQuery(
  state: RootState,
  scope: Model,
  query: string
): any | null {
  const fieldAt = query.lastIndexOf('.');
  if (fieldAt === -1) {
    console.error(`Missing field: ${query}`);
    return null;
  }

  const field = query.substring(fieldAt + 1);
  const model = findByQuery(state, scope, query.substring(0, fieldAt));

  return model && field in model ? model[field] : null;
}

export function findByQuery(
  state: RootState,
  scope: Model,
  query: string
): Model | null {
  let matches: Array<Match> = [{ distance: 0, model: scope }];
  query: while (query.length) {
    for (const { prefix, handler } of handlers) {
      if (!query.startsWith(prefix)) {
        continue;
      }

      query = query.substring(prefix.length);
      const segmentTo = query.indexOf('\\');
      const segment = segmentTo == -1 ? query : query.substring(0, segmentTo);

      matches = handler(state, matches, segment);
      query = query.substring(segment.length);
      continue query;
    }

    console.error(`Invalid query: ${query}`);
    return null;
  }

  matches.sort((lft, rgt) => lft.distance - rgt.distance);
  return matches.length ? matches[0].model : null;
}
