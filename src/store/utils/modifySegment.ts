import { Model } from '../models';
import { AnyPathSegment } from './parsePath';

export type ModifyCallback = {
  (value?: Model): Model | undefined;
};

export default function modifySegment(
  scope: Model,
  segment: AnyPathSegment | undefined,
  callback: ModifyCallback
): Model | undefined {
  if (!segment) {
    return callback(scope);
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
