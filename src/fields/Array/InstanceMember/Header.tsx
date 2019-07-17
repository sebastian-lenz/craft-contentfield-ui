import * as React from 'react';
import { DragElementWrapper, DragSourceOptions } from 'react-dnd';

import Button from './Button';
import Icon from '../../../components/Icon';
import InstancePreviewImage from '../../../components/InstancePreviewImage';
import InstancePreviewLabel from '../../../components/InstancePreviewLabel';
import More from './More';
import Text from '../../../components/Text';
import { InstanceField } from '../../Instance';
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
  field: InstanceField;
  hasPreview?: boolean;
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
  field,
  hasPreview,
  isCollapsible,
  isExpanded,
  model,
  onToggleExpanded,
  schema,
}: Props) {
  const handleItems = [];

  if (schema) {
    handleItems.push(<Icon key="icon" name={schema.icon} />);

    if (schema.previewImage) {
      handleItems.push(
        <InstancePreviewImage key="image" model={model} schema={schema} />
      );
    }

    handleItems.push(<strong key="label">{schema.label}</strong>);

    if (hasPreview && schema.previewLabelTemplate) {
      handleItems.push(
        <InstancePreviewLabel
          className="tcfArrayWidgetMember--headerPreview"
          field={field}
          key="label"
          model={model}
        />
      );
    }
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
