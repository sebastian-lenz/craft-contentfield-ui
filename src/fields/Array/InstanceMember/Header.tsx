import * as React from 'react';
import { DragElementWrapper, DragSourceOptions } from 'react-dnd';

import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import { Schema } from '../../../store/models';

export interface Props {
  dragSource: DragElementWrapper<DragSourceOptions>;
  isCollapsible: boolean;
  isExpanded: boolean;
  onDelete: () => void;
  onToggleExpanded: () => void;
  schema?: Schema;
}

export default function Header({
  dragSource,
  isCollapsible,
  isExpanded,
  onDelete,
  onToggleExpanded,
  schema,
}: Props) {
  const handleItems = [
    <Icon
      className="tcfArrayWidgetMember--headerHandleIcon"
      key="handle"
      name="move"
    />,
  ];

  if (schema) {
    handleItems.push(<Icon key="schemaIcon" name={schema.icon} />);
    handleItems.push(<Text key="schemaLabel" value={schema.label} />);
  }

  return (
    <div className="tcfArrayWidgetMember--header">
      {dragSource(
        <div className="tcfArrayWidgetMember--headerHandle">{handleItems}</div>
      )}
      <div className="tcfArrayWidgetMember--headerActions">
        {isCollapsible ? (
          <Button onClick={onToggleExpanded}>
            <Icon name={isExpanded ? 'done' : 'edit'} />
            <Text value={isExpanded ? 'Apply' : 'Edit'} />
          </Button>
        ) : null}
        <Button onClick={onDelete}>
          <Icon name="remove" />
          <Text value="Delete" />
        </Button>
      </div>
    </div>
  );
}
