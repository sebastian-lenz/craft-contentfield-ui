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
  return {
    ...state,
    sync,
  };
}

export default function updateSync(sync: SyncState): UpdateSyncAction {
  return {
    sync,
    type: 'updateSync',
  };
}
