import { Action } from 'redux';
import { RootState } from '../models';
import modifyPath from '../utils/modifyPath';
import { AnyPathSegment } from '../utils/parsePath';

export interface ChangeTypeAction extends Action {
  newType: string;
  path: string | Array<AnyPathSegment>;
  type: 'changeType';
}

export function applyChangeType(
  state: RootState,
  action: ChangeTypeAction
): RootState {
  return {
    ...state,
    model: modifyPath(state.model, action.path, model => ({
      ...model,
      __type: action.newType,
    })),
  };
}

export default function changeType(
  path: string | Array<AnyPathSegment>,
  newType: string
): ChangeTypeAction {
  return {
    newType,
    path,
    type: 'changeType',
  };
}
