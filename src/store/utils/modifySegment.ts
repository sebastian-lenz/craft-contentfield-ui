import { Model } from '../models';
import { AnyPathSegment } from './parsePath';

export type ModifyCallback = {
  (value: Model): Model;
};

export default function modifySegment(
  scope: Model,
  segment: AnyPathSegment | undefined,
  callback: ModifyCallback
): Model {
  if (!segment) {
    return callback(scope);
  }

  if (!(segment.name in scope)) {
    throw new Error(`The property "${segment.name}" does not exist.`);
  }

  const target = scope[segment.name];
  let newValue;

  if (segment.type === 'index') {
    if (!Array.isArray(target)) {
      throw new Error(`Invalid array access.`);
    }

    if (segment.index < 0 || segment.index >= target.length) {
      throw new Error(`Invalid array index ${segment.index}".`);
    }

    newValue = target.slice();
    newValue[segment.index] = callback(target[segment.index]);
  } else {
    if (Array.isArray(target)) {
      throw new Error(`Invalid array access.`);
    }

    newValue = callback(target);
  }

  const result = Object.assign({}, scope);
  result[segment.name] = newValue;
  return result;
}
