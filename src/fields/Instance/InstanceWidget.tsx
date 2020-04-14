import * as React from 'react';
import cx from 'classnames';

import CollapsiblePanel from './CollapsiblePanel';
import Instance from '../../components/Instance';
import isModel from '../../store/utils/isModel';
import { InstanceField } from './index';
import { WidgetProps } from '../FieldDefinition';

import './InstanceWidget.styl';

export interface Props extends WidgetProps<InstanceField> {}

export default function InstanceWidget({
  className,
  data,
  disabled,
  field,
  path,
}: Props) {
  const instance = (
    <Instance
      canChangeVisibility
      disabled={disabled}
      model={data}
      path={[...path, { type: 'property', name: field.name }]}
      schemaNames={field.schemas}
    />
  );

  if (field.collapsible && isModel(data)) {
    return (
      <CollapsiblePanel model={data} disabled={disabled} field={field}>
        {instance}
      </CollapsiblePanel>
    );
  }

  return <div className={cx('tcfInstanceWidget', className)}>{instance}</div>;
}
