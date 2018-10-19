import { Action } from 'redux';

import modifyPath from '../utils/modifyPath';
import { AnyPathSegment } from '../utils/parsePath';
import { RootState } from '../models';

export interface UpdateValueAction extends Action {
  path: string | Array<AnyPathSegment>;
  key: string;
  type: 'updateValue';
  value: any;
}

export function applyUpdateValue(
  state: RootState,
  action: UpdateValueAction
): RootState {
  return {
    ...state,
    model: modifyPath(state.model, action.path, model => ({
      ...model,
      [action.key]: action.value,
    })),
  };
}

export default function updateValue(
  path: string | Array<AnyPathSegment>,
  key: string,
  value: any
): UpdateValueAction {
  return {
    path,
    key,
    type: 'updateValue',
    value,
  };
}
