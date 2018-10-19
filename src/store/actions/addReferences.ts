import { Action } from 'redux';
import { RootState, Reference } from '../models';
import modifyPath from '../utils/modifyPath';
import findOwner from '../utils/findOwner';

export interface AddReferencesAction extends Action {
  references: Array<Reference>;
  type: 'addReferences';
}

export function applyAddReferences(
  state: RootState,
  action: AddReferencesAction
): RootState {
  const references = state.config.references.slice();
  for (const reference of action.references) {
    if (
      !references.some(
        ({ id, type }) => reference.id === id && reference.type === type
      )
    ) {
      references.push(reference);
    }
  }

  return {
    ...state,
    config: {
      ...state.config,
      references,
    },
  };
}

export default function addReferences(
  references: Array<Reference>
): AddReferencesAction {
  return {
    references,
    type: 'addReferences',
  };
}
