import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';

import Button from '../Button';
import createOverlay from '../../overlays';
import ExpandedStateProvider from '../../contexts/ExpandedStateProvider';
import Icon from '../Icon';
import Instance from '../Instance';
import Overlay from '../Overlay';
import Synchronize from '../Synchronize';
import Text from '../Text';
import { Model, RootState, SyncState } from '../../store/models';
import { OverlayState } from '../../store/models/overlay';
import { updateSync, setOverlay } from '../../store/actions';

import './index.styl';

export interface Props {
  canSynchronize: boolean;
  disabled: boolean;
  model: Model;
  onSetOverlay: (state: OverlayState) => void;
  onUpdateSync: (sync: SyncState) => void;
  overlay: OverlayState;
  schemas: Array<string>;
  sync: SyncState;
}

export interface State {
  isSynchronizing: boolean;
}

export class Root extends React.Component<Props, State> {
  state: State = {
    isSynchronizing: false,
  };

  handleOverlayClose = () => {
    this.props.onSetOverlay(null);
  };

  handleSyncClose = () => {
    const { onUpdateSync, sync } = this.props;
    if (sync.status === 'working') {
      return;
    }

    onUpdateSync({ status: 'idle' });
    this.setState({ isSynchronizing: false });
  };

  handleSyncStart = () => {
    this.setState({ isSynchronizing: true });
  };

  render() {
    const { isSynchronizing } = this.state;
    const {
      canSynchronize,
      disabled,
      model,
      overlay,
      schemas,
      sync,
    } = this.props;

    return (
      <ExpandedStateProvider>
        <Instance
          disabled={disabled}
          model={model}
          path={[]}
          schemaNames={schemas}
        />

        {canSynchronize && !disabled ? (
          <div className="tcfRoot--options">
            <Button onClick={this.handleSyncStart}>
              <Icon name="material:sync" />
              <Text value="Synchronize" />
            </Button>
          </div>
        ) : null}

        {isSynchronizing || sync.status !== 'idle' ? (
          <Overlay onClick={this.handleSyncClose}>
            <Synchronize onClose={this.handleSyncClose} sync={sync} />
          </Overlay>
        ) : null}

        {overlay ? (
          <Overlay onClick={this.handleOverlayClose}>
            {createOverlay(overlay)}
          </Overlay>
        ) : null}
      </ExpandedStateProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  connect(
    (state: RootState) => ({
      canSynchronize: state.config.supportedSites.length > 1,
      disabled: state.config.disabled,
      model: state.model,
      overlay: state.overlay,
      schemas: state.config.rootSchemas,
      sync: state.sync,
    }),
    dispatch => ({
      onSetOverlay: (state: OverlayState) => dispatch(setOverlay(state)),
      onUpdateSync: (sync: SyncState) => dispatch(updateSync(sync)),
    })
  )(Root)
);
