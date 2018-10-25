import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';

import Instance from '../Instance';
import { Model, RootState } from '../../store/models';
import { updateValue } from '../../store/actions';

export interface Props {
  model: Model;
  schemas: Array<string>;
}

export class Root extends React.Component<Props> {
  render() {
    const { model, schemas } = this.props;
    return (
      <Instance
        className="tcfRoot"
        model={model}
        path={[]}
        schemaNames={schemas}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(
  connect((state: RootState) => ({
    model: state.model,
    schemas: state.config.rootSchemas,
  }))(Root)
);
