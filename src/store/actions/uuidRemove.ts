import { Action } from 'redux';

import findByUuid from '../utils/findByUuid';
import findOwner from '../utils/findOwner';
import modifyPath from '../utils/modifyPath';
import validate from '../utils/validate';
import { RootState } from '../models';

export interface UuidRemoveAction extends Action {
  type: 'uuidRemove';
  uuid: string;
}

export function applyUuidRemove(
  state: RootState,
  { uuid }: UuidRemoveAction
): RootState {
  const location = findByUuid(state, uuid);
  if (!location) {
    return state;
  }

  const owner = findOwner(state, location.path);
  if (!owner || owner.field.type !== 'array' || owner.index === undefined) {
    return state;
  }

  const { field, index, path } = owner;
  const { name } = field;

  return {
    ...state,
    model: modifyPath(state.model, path, model => {
      if (!model || !(name in model)) {
        return model;
      }

      const orignalArray = model[name];
      if (!Array.isArray(orignalArray)) {
        return model;
      }

      const newValue = [...orignalArray];
      newValue.splice(index, 1);

      const newModel = {
        ...model,
        [name]: newValue,
      };

      validate(state, newModel);
      return newModel;
    }),
  };
}

export default function uuidRemove(uuid: string): UuidRemoveAction {
  return {
    type: 'uuidRemove',
    uuid,
  };
}
