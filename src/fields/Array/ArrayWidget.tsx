import * as React from 'react';
import { connect } from 'react-redux';

import fields from '../index';
import isModel from '../../store/utils/isModel';
import List from './List';
import { ArrayField } from './index';
import { toggleExpanded } from '../../store/actions';
import { WidgetProps } from '../FieldDefinition';

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

  handleUpdate = (index: number, value: any) => {
    const { data, onUpdate } = this.props;
    if (!Array.isArray(data)) return;

    const newValue = data.slice();
    newValue[index] = value;
    onUpdate(newValue);
  };

  render() {
    const { field, data, path } = this.props;
    const { limit } = field;
    if (!field.member) {
      return null;
    }

    const arrayData = Array.isArray(data) ? data : [];
    const hasReachedLimit = limit > 0 && arrayData.length >= limit;
    const memberDefinition = fields.getDefinition(field.member);

    let factory: React.ReactNode;
    if (memberDefinition && !hasReachedLimit) {
      factory = React.createElement(memberDefinition.factory, {
        field: field.member,
        onCreate: this.handleAdd,
      });
    }

    return (
      <List
        data={arrayData}
        field={field.member}
        isCollapsible={field.collapsible}
        isCompact={field.compact}
        limit={limit}
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
