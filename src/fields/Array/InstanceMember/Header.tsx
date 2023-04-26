import * as React from 'react';
import cx from 'classnames';
import { DragElementWrapper, DragSourceOptions } from 'react-dnd';

import Button from './Button';
import Icon from '../../../components/Icon';
import InstancePreviewImage from '../../../components/InstancePreviewImage';
import InstancePreviewLabel from '../../../components/InstancePreviewLabel';
import More from './More';
import Text from '../../../components/Text';
import { InstanceField } from '../../Instance';
import { Schema, Model } from '../../../store/models';

function passThrought(value: any) {
  return value;
}

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
  dragSource?: DragElementWrapper<DragSourceOptions>;
  field: InstanceField;
  hasPreview?: boolean;
  isCollapsible: boolean;
  isExpanded: boolean;
  model: Model;
  onToggleExpanded: () => void;
  schema?: Schema;
}

export default function Header({
  disabled,
  dragSource = passThrought,
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

    if (schema.previewImages && schema.previewImages.length) {
      handleItems.push(
        <InstancePreviewImage key="image" model={model} schema={schema} />
      );
    }

    handleItems.push(
      <div
        className={cx('tcfArrayWidgetMember--headerLabel', {
          isHidden: !model.__visible,
        })}
        key="label"
      >
        {schema.label}
      </div>
    );

    if (hasPreview && schema.previewLabelTemplate) {
      handleItems.push(
        <div className="tcfArrayWidgetMember--headerPreview" key="preview">
          <InstancePreviewLabel field={field} model={model} />
        </div>
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
        <div
          className={cx('tcfArrayWidgetMember--headerHandle', {
            enabled: !disabled,
          })}
          onClick={onToggleExpanded}
        >
          {handleItems}
        </div>
      )}
      {!model.__visible ? (
        <Icon
          className="tcfArrayWidgetMember--headerVisibility"
          name="material:visibility_off"
        />
      ) : null}
      <div className="tcfArrayWidgetMember--headerActions">
        {isCollapsible ? (
          <Button onClick={onToggleExpanded} primary={!disabled}>
            <Icon name={toggleIcon(isExpanded, disabled)} />
          </Button>
        ) : null}
        {!disabled ? <More uuid={model.__uuid} /> : null}
      </div>
    </div>
  );
}
