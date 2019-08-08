import { Action } from 'redux';

import findByUuid from '../utils/findByUuid';
import findOwner from '../utils/findOwner';
import modifyPath from '../utils/modifyPath';
import validate from '../utils/validate';
import { RootState } from '../models';

export interface UuidVisibilityAction extends Action {
  type: 'uuidVisibility';
  uuid: string;
}

export function applyUuidVisibility(
  state: RootState,
  { uuid }: UuidVisibilityAction
): RootState {
  const location = findByUuid(state, uuid);
  if (!location) {
    return state;
  }

  return {
    ...state,
    model: modifyPath(state.model, location.path, model => {
      if (!model) {
        return model;
      }

      return {
        ...model,
        __visible: !model.__visible,
      };
    }),
  };
}

export default function uuidVisibility(uuid: string): UuidVisibilityAction {
  return {
    type: 'uuidVisibility',
    uuid,
  };
}
