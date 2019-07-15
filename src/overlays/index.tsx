import * as React from 'react';

import EditInstance from './EditInstance';
import Synchronize from './Synchronize';
import { OverlayState } from '../store/models/overlay';

export default function createOverlay(state: OverlayState): JSX.Element | null {
  if (!state) {
    return null;
  }

  switch (state.type) {
    case 'edit':
      return <EditInstance {...state} />;
    case 'synchronize':
      return <Synchronize />;
  }
}
