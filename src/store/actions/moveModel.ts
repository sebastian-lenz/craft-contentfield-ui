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

export interface MoveModelAction extends Action {
  source: Array<AnyPathSegment>;
  target: Array<AnyPathSegment>;
  type: 'moveModel';
}

export function applyMoveModel(
  state: RootState,
  { source, target }: MoveModelAction
): RootState {
  let { model } = state;
  let childToMove: any = findByPath(model, source);
  const clonedChildToMove = isObject(childToMove)
    ? { ...childToMove }
    : childToMove;

  const sourceSegment = source.pop();
  if (!sourceSegment || sourceSegment.type !== 'index') {
    throw new Error('Unsupported operation');
  }

  // If the target path is within the source path, we must adjust
  // its index
  if (
    target.length > source.length &&
    source.every((segment, index) => isSegmentEqual(segment, target[index]))
  ) {
    const targetSegment = target[source.length];
    if (targetSegment.type != 'index') {
      throw new Error('Path segment type mismatch');
    }

    if (
      targetSegment.name == sourceSegment.name &&
      targetSegment.index > sourceSegment.index
    ) {
      targetSegment.index -= 1;
    }
  }

  const targetSegment = target.pop();
  if (!targetSegment || targetSegment.type !== 'index') {
    throw new Error('Unsupported operation');
  }

  // Remove the element from the source array
  model = modifyPath(model, source, sourceModel => {
    if (!sourceModel) {
      throw new Error('Invalid operation');
    }

    let value = sourceModel[sourceSegment.name];
    if (!Array.isArray(value)) {
      throw new Error('Invalid operation');
    }

    value = value.slice();
    value.splice(sourceSegment.index, 1);
    return { ...sourceModel, [sourceSegment.name]: value };
  });

  // Copy to target
  model = modifyPath(model, target, targetModel => {
    if (!targetModel) {
      throw new Error('Could not find target');
    }

    let children = targetModel[targetSegment.name];
    if (!Array.isArray(children)) {
      throw new Error('Unsupported operation');
    }

    children = children.slice();
    if (targetSegment.index >= children.length) {
      children.push(clonedChildToMove);
    } else {
      children.splice(targetSegment.index, 0, clonedChildToMove);
    }

    return { ...targetModel, [targetSegment.name]: children };
  });

  return {
    ...state,
    model,
  };
}

export default function moveModel({
  source,
  target,
  targetField,
  targetIndex,
}: MoveModelOptions): MoveModelAction {
  return {
    source: Array.isArray(source) ? source.slice() : parsePath(source),
    target: [
      ...(Array.isArray(target) ? target.slice() : parsePath(target)),
      { index: targetIndex, name: targetField, type: 'index' },
    ],
    type: 'moveModel',
  };
}
