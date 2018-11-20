import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';

import Instance from '../Instance';
import { Model, RootState } from '../../store/models';
import Overlay from '../Overlay';
import Button from '../Button';
import Icon from '../Icon';
import { Text } from '../Text';
import Synchronize from '../Synchronize';

import './index.styl';

export interface Props {
  canSynchronize: boolean;
  model: Model;
  schemas: Array<string>;
}

export interface State {
  isSynchronizing: boolean;
}

export class Root extends React.Component<Props, State> {
  state: State = {
    isSynchronizing: false,
  };

  handleOverlayClick = () => {
    this.setState({ isSynchronizing: false });
  };

  handleSynchronize = () => {
    this.setState({ isSynchronizing: true });
  };

  render() {
    const { canSynchronize, model, schemas } = this.props;
    const { isSynchronizing } = this.state;

    return (
      <>
        <Instance model={model} path={[]} schemaNames={schemas} />
        {canSynchronize ? (
          <div className="tcfRoot--options">
            <Button onClick={this.handleSynchronize}>
              <Icon name="material:sync" />
              <Text resolvedCategory="site" value="Synchronize" />
            </Button>
          </div>
        ) : null}
        {isSynchronizing ? (
          <Overlay onClick={this.handleOverlayClick}>
            <Synchronize />
          </Overlay>
        ) : null}
      </>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  connect((state: RootState) => ({
    canSynchronize: state.config.supportedSites.length > 1,
    model: state.model,
    schemas: state.config.rootSchemas,
  }))(Root)
);
