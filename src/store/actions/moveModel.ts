import { Action } from 'redux';

import modifyPath from '../utils/modifyPath';
import parsePath, { AnyPathSegment } from '../utils/parsePath';
import findByPath from '../utils/findByPath';
import { RootState } from '../models';
import isSegmentEqual from '../utils/isSegmentEqual';

function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object';
}

export interface MoveModelOptions {
  source: string | Array<AnyPathSegment>;
  target: string | Array<AnyPathSegment>;
  targetField: string;
  targetIndex: number;
}

export interface MoveModelAction extends Action, MoveModelOptions {
  type: 'moveModel';
}

export function applyMoveModel(
  state: RootState,
  { source, target, targetField, targetIndex }: MoveModelAction
): RootState {
  const sourcePath = Array.isArray(source) ? source.slice() : parsePath(source);
  const targetPath = Array.isArray(target) ? target.slice() : parsePath(target);
  let { model } = state;
  let childToMove: any = findByPath(model, sourcePath);

  const clonedChildToMove = isObject(childToMove)
    ? { ...childToMove }
    : childToMove;

  const sourceSegment = sourcePath.pop();
  if (!sourceSegment || sourceSegment.type !== 'index') {
    throw new Error('Unsupported operation');
  }

  // If the target path is within the source path, we must adjust
  // its index
  if (
    targetPath.length > sourcePath.length &&
    sourcePath.every((segment, index) =>
      isSegmentEqual(segment, targetPath[index])
    )
  ) {
    const targetSegment = targetPath[sourcePath.length];
    if (
      targetSegment.type == 'index' &&
      targetSegment.name == sourceSegment.name &&
      targetSegment.index > sourceSegment.index
    ) {
      targetSegment.index -= 1;
    }
  }

  // Remove the element from the source array
  model = modifyPath(model, sourcePath, source => {
    if (!source) {
      throw new Error('Invalid operation');
    }

    let value = source[sourceSegment.name];
    if (!Array.isArray(value)) {
      throw new Error('Invalid operation');
    }

    value = value.slice();
    value.splice(sourceSegment.index, 1);
    return { ...source, [sourceSegment.name]: value };
  });

  // Copy to target
  model = modifyPath(model, targetPath, target => {
    if (!target) {
      throw new Error('Could not find target');
    }

    let children = target[targetField];
    if (!Array.isArray(children)) {
      throw new Error('Unsupported operation');
    }

    children = children.slice();
    if (targetIndex >= children.length) {
      children.push(clonedChildToMove);
    } else {
      children.splice(targetIndex, 0, clonedChildToMove);
    }

    return { ...target, [targetField]: children };
  });

  return {
    ...state,
    model,
  };
}

export default function moveModel(options: MoveModelOptions): MoveModelAction {
  return {
    ...options,
    type: 'moveModel',
  };
}
