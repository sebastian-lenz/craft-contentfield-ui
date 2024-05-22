import { Action } from 'redux';
import { RootState, Reference } from '../models';
import { referenceEuqals } from '../../components/ElementSelect/utils';

export interface AddReferencesAction extends Action {
  references: Array<Reference>;
  type: 'addReferences';
}

export function applyAddReferences(
  state: RootState,
  action: AddReferencesAction
): RootState {
  const references = state.config.references.slice();
  const scope = document.createElement('div');

  for (const reference of action.references) {
    const index = references.findIndex((existing) =>
      referenceEuqals(existing, reference)
    );

    if (index !== -1) {
      references.slice(index, 1);
    }

    references.push(reference);
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
