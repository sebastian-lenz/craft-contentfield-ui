import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';

import Button from '../Button';
import createOverlay from '../../overlays';
import ExpandedStateProvider from '../../contexts/ExpandedStateProvider';
import Icon from '../Icon';
import Instance from '../Instance';
import Overlay from '../Overlay';
import Text from '../Text';
import { RootState } from '../../store/models';
import { setOverlay, updateSync } from '../../store/actions';

import './index.styl';

export default function Root() {
  const dispatch = useDispatch();
  const model = useSelector((state: RootState) => state.model);
  const overlay = useSelector((state: RootState) => state.overlay);
  const { disabled, rootSchemas, supportedSites } = useSelector(
    (state: RootState) => state.config
  );

  const canSynchronize = supportedSites.length > 1;

  const handleOverlayClose = () => {
    if (overlay && !overlay.preventClose) {
      dispatch(setOverlay(null));
    }
  };

  const handleShowSynchronize = () => {
    dispatch(updateSync({ status: 'idle' }));
    dispatch(setOverlay({ type: 'synchronize' }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ExpandedStateProvider>
        <Instance
          disabled={disabled}
          model={model}
          path={[]}
          schemaNames={rootSchemas}
        />

        {canSynchronize && !disabled ? (
          <div className="tcfRoot--options">
            <Button onClick={handleShowSynchronize}>
              <Icon name="material:sync" />
              <Text value="Synchronize" />
            </Button>
          </div>
        ) : null}

        {overlay ? (
          <Overlay onClick={handleOverlayClose}>
            {createOverlay(overlay)}
          </Overlay>
        ) : null}
      </ExpandedStateProvider>
    </DndProvider>
  );
}
