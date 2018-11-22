import * as React from 'react';

import Error from './Error';
import Finished from './Finished';
import Options from './Options';
import Working from './Working';
import { SyncState } from '../../store/models';

import './index.styl';

export interface Props {
  onClose: () => void;
  sync: SyncState;
}

export default function Synchronize({ onClose, sync }: Props) {
  let content: React.ReactNode;
  if (sync.status === 'working') {
    content = <Working />;
  } else if (sync.status === 'error') {
    content = <Error message={sync.message} onClose={onClose} />;
  } else if (sync.status === 'finished') {
    content = <Finished onClose={onClose} />;
  } else {
    content = <Options onClose={onClose} />;
  }

  return <div className="tcfSynchronize">{content}</div>;
}
