import { Action } from 'redux';

import modifyPath from '../utils/modifyPath';
import { AnyPathSegment } from '../utils/parsePath';
import { RootState } from '../models';
import validate from '../utils/validate';

export interface UpdateValueAction extends Action {
  path: string | Array<AnyPathSegment>;
  key?: string;
  type: 'updateValue';
  value: any;
}

export function applyUpdateValue(
  state: RootState,
  { path, key, value }: UpdateValueAction
): RootState {
  return {
    ...state,
    model: modifyPath(state.model, path, model => {
      const newModel = key
        ? {
            ...model,
            [key]: value,
          }
        : value;

      validate(state, newModel);
      return newModel;
    }),
  };
}

export default function updateValue(
  path: string | Array<AnyPathSegment>,
  key: string | undefined,
  value: any
): UpdateValueAction {
  return {
    path,
    key,
    type: 'updateValue',
    value,
  };
}
