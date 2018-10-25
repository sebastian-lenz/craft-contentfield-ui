import { Action } from 'redux';
import { RootState } from '../models';
import modifyPath from '../utils/modifyPath';
import { AnyPathSegment } from '../utils/parsePath';
import createModel from '../utils/createModel';

export interface ChangeTypeAction extends Action {
  newType: string;
  path: string | Array<AnyPathSegment>;
  type: 'changeType';
}

export function applyChangeType(
  state: RootState,
  action: ChangeTypeAction
): RootState {
  const schema = state.schemas[action.newType];
  if (!schema) {
    return state;
  }

  return {
    ...state,
    model: modifyPath(state.model, action.path, oldModel =>
      createModel({
        oldModel,
        schema,
        schemas: state.schemas,
      })
    ),
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
