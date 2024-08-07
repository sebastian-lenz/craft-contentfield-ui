import { RootState } from './models';
import { AnyAction, handlers } from './actions';

export function createRootState(): RootState {
  return {
    config: {
      apiEndpoints: {
        anchors: '',
        fetchSite: '',
        hotspotAsset: '',
        oembed: '',
        reference: '',
        translate: '',
      },
      csrfTokenName: '',
      csrfTokenValue: '',
      disabled: false,
      elementId: null,
      elementSiteId: 0,
      fieldHandle: '',
      hasTranslator: false,
      references: [],
      rootSchemas: [],
      supportedSites: [],
    },
    model: {
      __errors: {},
      __type: 'unknown',
      __uuid: '0',
      __visible: true,
    },
    overlay: null,
    schemas: {},
    sync: {
      status: 'idle',
    },
    user: {
      favoriteSchemas: {},
    },
  };
}

export default function (
  state: RootState = createRootState(),
  action: AnyAction
): RootState {
  if (action.type in handlers) {
    return (handlers[action.type] as any)(state, action);
  }

  return state;
}
