import isModel from './isModel';
import findBySegment from './findBySegment';
import findByUuid from './findByUuid';
import type { Model, RootState } from '../models';

export function findParent(state: RootState, model: Model): Model | null {
  return findParents(state, model).pop() || null;
}

export function findParents(state: RootState, model: Model): Array<Model> {
  const parents: Array<Model> = [];
  const location = findByUuid(state, model.__uuid);
  if (!location) {
    return parents;
  }

  const { path } = location;
  let scope = state.model;
  let segment;

  while (scope && (segment = path.shift())) {
    if (isModel(scope)) {
      parents.push(scope);
    }

    scope = findBySegment(scope, segment);
  }

  return parents;
}
