import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';

import FieldPanel from '../FieldPanel';
import Instance from '../Instance';
import Select from '../Select';
import { Model, RootState, Schema } from '../../store/models';
import { changeType } from '../../store/actions';

export interface Props {
  model: Model;
  onChangeType: (type: string) => void;
  rootSchemas: Array<Schema>;
}

export class Root extends React.Component<Props> {
  render() {
    const { model, onChangeType, rootSchemas } = this.props;

    return (
      <div>
        <FieldPanel label="Root schema">
          <Select
            onChange={onChangeType}
            options={rootSchemas.map(({ qualifier, label }) => ({
              key: qualifier,
              label,
              value: qualifier,
            }))}
            value={model.__type}
          />
        </FieldPanel>
        <Instance model={model} path={[]} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  connect(
    (state: RootState) => ({
      model: state.model,
      rootSchemas: state.config.rootSchemas.map(name => state.schemas[name]),
    }),
    dispatch => ({
      onChangeType: (type: string) => dispatch(changeType('', type)),
    })
  )(Root)
);
