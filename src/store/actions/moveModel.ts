import { Action } from 'redux';

import applyMoveShift from '../utils/applyMoveShift';
import canMove, { MoveInfo } from '../utils/canMove';
import findByPath from '../utils/findByPath';
import modifyPath from '../utils/modifyPath';
import { RootState } from '../models';

import parsePath, { AnyPathSegment, Path } from '../utils/parsePath';

function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object';
}

export interface MoveModelOptions extends MoveInfo {}

export interface MoveModelAction extends Action, MoveInfo {
  type: 'moveModel';
}

export function applyMoveModel(
  state: RootState,
  action: MoveModelAction
): RootState {
  let { model } = state;
  if (!canMove(state, action)) {
    throw new Error('Invalid operation');
  }

  const {
    sourcePath,
    sourceSegment,
    targetPath,
    targetSegment,
  } = applyMoveShift(action);

  const childToMove: any = findByPath(model, [...sourcePath, sourceSegment]);

  // Remove the element from the source array
  model = modifyPath(model, sourcePath, sourceModel => {
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
  model = modifyPath(model, targetPath, targetModel => {
    if (!targetModel) {
      throw new Error('Could not find target');
    }

    let children = targetModel[targetSegment.name];
    if (!Array.isArray(children)) {
      throw new Error('Unsupported operation');
    }

    children = children.slice();
    if (targetSegment.index >= children.length) {
      children.push(childToMove);
    } else {
      children.splice(targetSegment.index, 0, childToMove);
    }

    return { ...targetModel, [targetSegment.name]: children };
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
