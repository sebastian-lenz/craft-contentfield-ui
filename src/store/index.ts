import { RootState } from './models';
import { AnyAction, handlers } from './actions';

export function createRootState(): RootState {
  return {
    config: {
      apiEndpoint: '',
      elementId: null,
      elementSiteId: 0,
      expanded: [],
      fieldHandle: '',
      i18nCategory: 'site',
      references: [],
      rootSchemas: [],
      supportedSites: [],
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
    return (handlers[action.type] as any)(state, action);
  }

  return state;
}
