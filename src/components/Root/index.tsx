import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';

import Button from '../Button';
import Icon from '../Icon';
import Instance from '../Instance';
import Overlay from '../Overlay';
import Synchronize from '../Synchronize';
import Text from '../Text';
import { Model, RootState, SyncState } from '../../store/models';
import { updateSync } from '../../store/actions';

import './index.styl';

export interface Props {
  canSynchronize: boolean;
  model: Model;
  onUpdateSync: (sync: SyncState) => void;
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
    const { canSynchronize, model, schemas, sync } = this.props;
    const { isSynchronizing } = this.state;

    return (
      <>
        <Instance model={model} path={[]} schemaNames={schemas} />

        {canSynchronize ? (
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
      </>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  connect(
    (state: RootState) => ({
      canSynchronize: state.config.supportedSites.length > 1,
      model: state.model,
      schemas: state.config.rootSchemas,
      sync: state.sync,
    }),
    dispatch => ({
      onUpdateSync: (sync: SyncState) => dispatch(updateSync(sync)),
    })
  )(Root)
);
