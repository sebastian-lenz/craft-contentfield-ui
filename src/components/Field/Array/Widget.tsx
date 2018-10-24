import * as React from 'react';
import { connect } from 'react-redux';

import isModel from '../../../store/utils/isModel';
import List from './List';
import { ArrayField } from './index';
import { getDefinition } from '../registry';
import { toggleExpanded } from '../../../store/actions';
import { WidgetProps } from '../types';

import './index.styl';

export type Props = WidgetProps<ArrayField> & {
  onToggleExpanded: (uuid: string, expand?: boolean) => void;
};

export class ArrayWidget extends React.Component<Props> {
  handleAdd = (value: any) => {
    const { data, onToggleExpanded, onUpdate } = this.props;
    const newValue = Array.isArray(data) ? data.slice() : [];
    newValue.push(value);

    onUpdate(newValue);
    if (isModel(value)) {
      onToggleExpanded(value.__uuid, true);
    }
  };

  handleDelete = (index: number) => {
    const { data, onUpdate } = this.props;
    if (!Array.isArray(data)) return;

    const newValue = data.slice();
    newValue.splice(index, 1);
    onUpdate(newValue);
  };

  handleUpdate(index: number, value: any) {
    const { data, onUpdate } = this.props;
    if (!Array.isArray(data)) return;

    const newValue = data.slice();
    newValue[index] = value;
    onUpdate(newValue);
  }

  render() {
    const { field, data, path } = this.props;
    if (!field.member) {
      return null;
    }

    const definition = getDefinition(field.member);
    let factory: React.ReactNode;
    if (definition) {
      factory = React.createElement(definition.factory, {
        field: field.member,
        onCreate: this.handleAdd,
      });
    }

    return (
      <List
        data={data}
        field={field.member}
        onDelete={this.handleDelete}
        onUpdate={this.handleUpdate}
        path={path}
      >
        {factory}
      </List>
    );
  }
}

export default connect(
  null,
  disptach => ({
    onToggleExpanded: (uuid: string, expand?: boolean) =>
      disptach(toggleExpanded(uuid, expand)),
  })
)(ArrayWidget);
