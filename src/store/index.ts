import { RootState } from './models';
import { AnyAction, handlers } from './actions';

export function createRootState(): RootState {
  return {
    config: {
      apiEndpoints: {
        fetchSite: '',
        oembed: '',
        translate: '',
      },
      disabled: false,
      elementId: null,
      elementSiteId: 0,
      fieldHandle: '',
      i18nCategory: 'site',
      references: [],
      rootSchemas: [],
      supportedSites: [],
    },
    model: {
      __errors: {},
      __type: 'unknown',
      __uuid: '0',
    },
    overlay: null,
    schemas: {},
    sync: {
      status: 'idle',
    },
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
