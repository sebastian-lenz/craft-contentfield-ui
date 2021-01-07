import findBySegment from './findBySegment';
import parsePath, { AnyPathSegment } from './parsePath';
import { Model } from '../models';
import isModel from './isModel';

export default function findByPath(
  scope: Model,
  path: string | Array<AnyPathSegment>
): Model | null {
  if (typeof path === 'string') {
    path = parsePath(path);
  }

  let target: any | null = scope;
  for (let index = 0; index < path.length; index++) {
    target = findBySegment(target, path[index]);
    if (!target) {
      return null;
    }
  }

  return isModel(target) ? target : null;
}
