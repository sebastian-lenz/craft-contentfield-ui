import { Action } from 'redux';

import findByUuid from '../utils/findByUuid';
import findOwner from '../utils/findOwner';
import modifyPath from '../utils/modifyPath';
import validate from '../utils/validate';
import { RootState } from '../models';

export type UuidInsertPosition = 'after' | 'before';

export interface UuidInsertAction extends Action {
  position: UuidInsertPosition;
  type: 'uuidInsert';
  uuid: string;
  value: any;
}

export function applyUuidInsert(
  state: RootState,
  { position, uuid, value }: UuidInsertAction
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
      const insertIndex = index + (position === 'after' ? 1 : 0);
      newValue.splice(insertIndex, 0, value);

      const newModel = {
        ...model,
        [name]: newValue,
      };

      validate(state, newModel);
      return newModel;
    }),
  };
}

export default function uuidInsert(
  uuid: string,
  value: any,
  position: UuidInsertPosition
): UuidInsertAction {
  return {
    position,
    type: 'uuidInsert',
    uuid,
    value,
  };
}
