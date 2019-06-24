import { Action } from 'redux';

import { OverlayState } from '../models/overlay';
import { RootState } from '../models';

export interface SetOverlayAction extends Action {
  overlay: OverlayState;
  type: 'setOverlay';
}

export function applySetOverlay(
  state: RootState,
  { overlay }: SetOverlayAction
): RootState {
  return {
    ...state,
    overlay,
  };
}

export default function setOverlay(overlay: OverlayState): SetOverlayAction {
  return {
    overlay,
    type: 'setOverlay',
  };
}
