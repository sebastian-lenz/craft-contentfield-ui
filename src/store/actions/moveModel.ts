import { Action } from 'redux';

import modifyPath from '../utils/modifyPath';
import parsePath, { AnyPathSegment } from '../utils/parsePath';
import { RootState } from '../models';
import isPathEqual from '../utils/isPathEqual';

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
  let model = state.model;
  let dataToMove: any;

  const sourceSegment = sourcePath.pop();
  if (!sourceSegment || sourceSegment.type !== 'index') {
    throw new Error('Unsupported operation');
  }

  model = modifyPath(model, sourcePath, model => {
    let data = model[sourceSegment.name];
    if (!Array.isArray(data)) {
      throw new Error('Unsupported operation');
    }

    if (
      isPathEqual(sourcePath, targetPath) &&
      sourceSegment.index < targetIndex
    ) {
      targetIndex -= 1;
    }

    dataToMove = data[sourceSegment.index];
    data = data.slice();
    data.splice(sourceSegment.index, 1);
    return { ...model, [sourceSegment.name]: data };
  });

  model = modifyPath(model, targetPath, model => {
    let data = model[targetField];
    if (!Array.isArray(data)) {
      throw new Error('Unsupported operation');
    }

    data = data.slice();
    if (targetIndex >= data.length) {
      data.push(dataToMove);
    } else {
      data.splice(targetIndex, 0, dataToMove);
    }
    return { ...model, [sourceSegment.name]: data };
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
