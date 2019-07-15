import { Action } from 'redux';

import { RootState, SyncState } from '../models';

export interface UpdateSyncAction extends Action {
  sync: SyncState;
  type: 'updateSync';
}

export function applyUpdateSync(
  state: RootState,
  { sync }: UpdateSyncAction
): RootState {
  let { overlay } = state;
  if (overlay && overlay.type === 'synchronize') {
    overlay = { ...overlay, preventClose: sync.status === 'working' };
  }

  return {
    ...state,
    overlay,
    sync,
  };
}

export default function updateSync(sync: SyncState): UpdateSyncAction {
  return {
    sync,
    type: 'updateSync',
  };
}
