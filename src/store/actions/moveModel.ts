import { Action } from 'redux';

import modifyPath from '../utils/modifyPath';
import parsePath, { AnyPathSegment } from '../utils/parsePath';
import findByPath from '../utils/findByPath';
import { RootState } from '../models';

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

  // Make sure we move an unique object as we will look
  // for it in the second step
  if (!isObject(childToMove)) {
    childToMove = new Object();
    model = modifyPath(model, sourcePath, source => {
      if (!source) {
        throw new Error('Invalid operation');
      }

      let children = source[sourceSegment.name];
      if (!Array.isArray(children)) {
        throw new Error('Invalid operation');
      }

      children = children.slice();
      children[sourceSegment.index] = childToMove;
      return { ...source, [sourceSegment.name]: children };
    });
  }

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

  // Remove from source
  model = modifyPath(model, sourcePath, source => {
    if (!source) {
      throw new Error('Could not find source');
    }

    let children = source[sourceSegment.name];
    if (!Array.isArray(children)) {
      throw new Error('Unsupported operation');
    }

    children = children.filter(child => child !== childToMove);
    return { ...source, [sourceSegment.name]: children };
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
