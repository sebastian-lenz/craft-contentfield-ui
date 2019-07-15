import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Error from './Error';
import Finished from './Finished';
import Options from './Options';
import Window from '../../components/Window';
import Working from './Working';
import { RootState } from '../../store/models';
import { setOverlay } from '../../store/actions';

import './index.styl';

export default function Synchronize() {
  const sync = useSelector((state: RootState) => state.sync);
  const dispatch = useDispatch();
  const onClose = () => dispatch(setOverlay(null));

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

  return <Window width={800}>{content}</Window>;
}
