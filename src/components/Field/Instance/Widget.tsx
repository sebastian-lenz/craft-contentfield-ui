import * as React from 'react';

import Instance from '../../Instance';
import { InstanceField } from './index';
import { WidgetProps } from '../types';

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
      path={path}
      schemaNames={field.schemas}
    />
  );
}
