import * as React from 'react';
import cx from 'classnames';

import Instance from '../../components/Instance';
import { InstanceField } from './index';
import { WidgetProps } from '../FieldDefinition';

import './InstanceWidget.styl';

export interface Props extends WidgetProps<InstanceField> {}

export default function InstanceWidget({
  className,
  data,
  field,
  path,
}: Props) {
  return (
    <div className={cx('tcfInstanceWidget', className)}>
      <Instance
        model={data}
        path={[...path, { type: 'property', name: field.name }]}
        schemaNames={field.schemas}
      />
    </div>
  );
}
