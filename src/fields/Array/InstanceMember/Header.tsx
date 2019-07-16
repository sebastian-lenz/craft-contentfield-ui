import * as React from 'react';
import { DragElementWrapper, DragSourceOptions } from 'react-dnd';

import Button from './Button';
import Icon from '../../../components/Icon';
import More from './More';
import Text from '../../../components/Text';
import { Schema, Model } from '../../../store/models';

function toggleIcon(isExpanded: boolean, disabled?: boolean): string {
  if (disabled) {
    return isExpanded ? 'minus' : 'plus';
  } else {
    return isExpanded ? 'done' : 'edit';
  }
}

function toggleText(isExpanded: boolean, disabled?: boolean): string {
  if (disabled) {
    return isExpanded ? 'Collapse' : 'Expand';
  } else {
    return isExpanded ? 'Apply' : 'Edit';
  }
}

export interface Props {
  disabled?: boolean;
  dragSource: DragElementWrapper<DragSourceOptions>;
  isCollapsible: boolean;
  isExpanded: boolean;
  model: Model;
  onDelete: () => void;
  onToggleExpanded: () => void;
  schema?: Schema;
  uuid?: string;
}

export default function Header({
  disabled,
  dragSource,
  isCollapsible,
  isExpanded,
  model,
  onToggleExpanded,
  schema,
}: Props) {
  const handleItems = [];

  if (schema) {
    handleItems.push(<Icon key="schemaIcon" name={schema.icon} />);
    handleItems.push(<span key="schemaLabel">{schema.label}</span>);
  } else {
    handleItems.push(
      <Icon
        className="tcfArrayWidgetMember--headerHandleIcon"
        key="handle"
        name="move"
      />
    );
  }

  return (
    <div className="tcfArrayWidgetMember--header">
      {dragSource(
        <div className="tcfArrayWidgetMember--headerHandle">{handleItems}</div>
      )}
      <div className="tcfArrayWidgetMember--headerActions">
        {isCollapsible ? (
          <Button onClick={onToggleExpanded} primary={!disabled}>
            <Icon name={toggleIcon(isExpanded, disabled)} />
            <Text value={toggleText(isExpanded, disabled)} />
          </Button>
        ) : null}
        {!disabled ? <More uuid={model.__uuid} /> : null}
      </div>
    </div>
  );
}
