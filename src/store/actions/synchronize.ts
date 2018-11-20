import { Action } from 'redux';

import { RootState } from '../models';

export interface SynchronizeAction extends Action {
  type: 'synchronize';
}

export function applySynchronize(
  state: RootState,
  action: SynchronizeAction
): RootState {
  return {
    ...state,
  };
}

export default function synchronize(): SynchronizeAction {
  return {
    type: 'synchronize',
  };
}
