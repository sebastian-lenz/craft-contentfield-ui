import * as React from 'react';

import Create from './Create';
import EditInstance from './EditInstance';
import Synchronize from './Synchronize';
import { OverlayState } from '../store/models/overlay';

export default function createOverlay(state: OverlayState): JSX.Element | null {
  if (!state) {
    return null;
  }

  switch (state.type) {
    case 'create':
      return <Create {...state} />;
    case 'edit':
      return <EditInstance {...state} />;
    case 'synchronize':
      return <Synchronize />;
  }
}
