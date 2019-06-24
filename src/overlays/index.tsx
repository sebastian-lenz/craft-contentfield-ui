import * as React from 'react';

import EditInstance from './EditInstance';
import { OverlayState } from '../store/models/overlay';

export default function createOverlay(state: OverlayState): JSX.Element | null {
  if (!state) {
    return null;
  }

  switch (state.type) {
    case 'edit':
      return <EditInstance {...state} />;
  }
}
