import * as React from 'react';

import fields from '../index';
import isModel from '../../store/utils/isModel';
import List from './List';
import { ArrayField } from './index';
import { Context } from '../../contexts/ExpandedStateProvider';
import { WidgetProps } from '../FieldDefinition';

export type Props = WidgetProps<ArrayField>;

export default class ArrayWidget extends React.Component<Props> {
  context!: React.ContextType<typeof Context>;
  static contextType = Context;

  handleAdd = (value: any) => {
    const { context } = this;
    const { data, onUpdate } = this.props;
    const newValue = Array.isArray(data) ? data.slice() : [];
    newValue.push(value);

    onUpdate(newValue);

    if (isModel(value) && context) {
      context.toggleExpanded(value.__uuid, true);
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
    const { field, data, model, path } = this.props;
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
        model={model}
        onDelete={this.handleDelete}
        onUpdate={this.handleUpdate}
        path={path}
      >
        {factory}
      </List>
    );
  }
}
