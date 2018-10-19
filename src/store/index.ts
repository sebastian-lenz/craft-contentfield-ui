import { RootState } from './models';
import { AnyAction, handlers } from './actions';

export function createRootState(): RootState {
  return {
    config: {
      elementId: null,
      expanded: [],
      i18nCategory: 'site',
      references: [],
      rootSchemas: [],
    },
    model: {
      __type: 'unknown',
      __uuid: '0',
    },
    schemas: {},
  };
}

export default function(
  state: RootState = createRootState(),
  action: AnyAction
): RootState {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }

  return state;
}
