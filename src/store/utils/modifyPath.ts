import modifySegment, { ModifyCallback } from './modifySegment';
import parsePath, { AnyPathSegment } from './parsePath';
import { Model } from '../models';

export default function modifyPath(
  data: Model,
  path: string | Array<AnyPathSegment>,
  callback: ModifyCallback
): Model {
  const remaining = typeof path === 'string' ? parsePath(path) : path.slice();
  let segment = remaining.shift();

  function modifyCallback(value: Model): Model {
    segment = remaining.shift();
    return segment
      ? modifySegment(value, segment, modifyCallback)
      : callback(value);
  }

  return modifySegment(data, segment, modifyCallback) as Model;
}
