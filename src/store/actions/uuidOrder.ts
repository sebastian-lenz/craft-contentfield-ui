import { Action } from 'redux';

import findByUuid from '../utils/findByUuid';
import findOwner from '../utils/findOwner';
import modifyPath from '../utils/modifyPath';
import validate from '../utils/validate';
import { RootState } from '../models';

export type Direction = 'up' | 'down';

export interface UuidOrderAction extends Action {
  direction: Direction;
  type: 'uuidOrder';
  uuid: string;
}

export function applyUuidOrder(
  state: RootState,
  { direction, uuid }: UuidOrderAction
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

      const newIndex = index + (direction === 'up' ? -1 : 1);
      const newValue = [...orignalArray];
      const fieldValue = newValue.splice(index, 1);
      newValue.splice(newIndex, 0, ...fieldValue);

      const newModel = {
        ...model,
        [name]: newValue,
      };

      validate(state, newModel);
      return newModel;
    }),
  };
}

export default function uuidOrder(
  uuid: string,
  direction: Direction
): UuidOrderAction {
  return {
    direction,
    type: 'uuidOrder',
    uuid,
  };
}
