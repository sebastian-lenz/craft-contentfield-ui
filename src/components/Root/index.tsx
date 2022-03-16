import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import ButtonFlat from '../ButtonFlat';
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
  const { disabled, hideSyncButton, rootSchemas, supportedSites } = useSelector(
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
        {canSynchronize && !disabled && !hideSyncButton ? (
          <div className="tcfRoot--options">
            <ButtonFlat onClick={handleShowSynchronize} outline>
              <Icon name="material:sync" />
              <Text value="Synchronize translations" />
            </ButtonFlat>
          </div>
        ) : null}

        <Instance
          disabled={disabled}
          model={model}
          path={[]}
          schemaNames={rootSchemas}
        />

        {overlay ? (
          <Overlay onClick={handleOverlayClose}>
            {createOverlay(overlay)}
          </Overlay>
        ) : null}
      </ExpandedStateProvider>
    </DndProvider>
  );
}
