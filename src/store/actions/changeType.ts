import { Action } from 'redux';
import { RootState } from '../models';
import modifyPath from '../utils/modifyPath';
import findOwner from '../utils/findOwner';

export interface ChangeTypeAction extends Action {
  newType: string;
  path: string;
  type: 'changeType';
}

export function applyChangeType(
  state: RootState,
  action: ChangeTypeAction
): RootState {
  const owner = findOwner(state, action.path);

  return {
    ...state,
    model: modifyPath(state.model, action.path, model => ({
      ...model,
      __type: action.newType,
    })),
  };
}

export default function changeType(
  path: string,
  newType: string
): ChangeTypeAction {
  return {
    newType,
    path,
    type: 'changeType',
  };
}
