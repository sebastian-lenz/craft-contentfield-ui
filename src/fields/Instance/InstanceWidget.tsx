import * as React from 'react';

import Instance from '../../components/Instance';
import { InstanceField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<InstanceField> {}

export default function InstanceWidget({
  className,
  data,
  field,
  path,
}: Props) {
  return (
    <Instance
      className={className}
      model={data}
      path={[...path, { type: 'property', name: field.name }]}
      schemaNames={field.schemas}
    />
  );
}
