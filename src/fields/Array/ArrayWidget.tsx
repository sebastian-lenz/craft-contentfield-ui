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
    const { data, disabled, onUpdate } = this.props;
    if (disabled) return;

    const newValue = Array.isArray(data) ? data.slice() : [];
    newValue.push(value);

    onUpdate(newValue);

    if (isModel(value) && context) {
      context.toggleExpanded(value.__uuid, true);
    }
  };

  handleDelete = (index: number) => {
    const { data, disabled, onUpdate } = this.props;
    if (disabled || !Array.isArray(data)) return;

    const newValue = data.slice();
    newValue.splice(index, 1);
    onUpdate(newValue);
  };

  handleUpdate = (index: number, value: any) => {
    const { data, disabled, onUpdate } = this.props;
    if (disabled || !Array.isArray(data)) return;

    const newValue = data.slice();
    newValue[index] = value;
    onUpdate(newValue);
  };

  render() {
    const { data, disabled, field, model, path } = this.props;
    const { limit } = field;
    if (!field.member) {
      return null;
    }

    const arrayData = Array.isArray(data) ? data : [];
    const hasReachedLimit = limit > 0 && arrayData.length >= limit;
    const memberDefinition = fields.getDefinition(field.member);

    let factory: React.ReactNode;
    if (!disabled && (memberDefinition && !hasReachedLimit)) {
      factory = React.createElement(memberDefinition.factory, {
        field: field.member,
        onCreate: this.handleAdd,
        scope: model.__type,
      });
    }

    return (
      <List
        data={arrayData}
        disabled={disabled}
        field={field.member}
        isCollapsible={field.collapsible}
        limit={limit}
        model={model}
        onDelete={this.handleDelete}
        onUpdate={this.handleUpdate}
        path={path}
        previewMode={field.previewMode}
      >
        {factory}
      </List>
    );
  }
}
