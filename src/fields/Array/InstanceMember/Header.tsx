import * as React from 'react';
import { DragElementWrapper, DragSourceOptions } from 'react-dnd';

import Button from './Button';
import Icon from '../../../components/Icon';
import More from './More';
import Text from '../../../components/Text';
import { Schema, Model } from '../../../store/models';

export interface Props {
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
          <Button onClick={onToggleExpanded} primary>
            <Icon name={isExpanded ? 'done' : 'edit'} />
            <Text
              value={
                isExpanded ? 'ARRAY_MEMBER_COLLAPSE' : 'ARRAY_MEMBER_EXPAND'
              }
            />
          </Button>
        ) : null}
        <More uuid={model.__uuid} />
      </div>
    </div>
  );
}
