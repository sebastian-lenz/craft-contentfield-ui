import { Action } from 'redux';
import { RootState, Reference } from '../models';

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
      reference.$element = $(reference.element);
      reference.hasThumb = reference.$element.hasClass('hasthumb');
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
