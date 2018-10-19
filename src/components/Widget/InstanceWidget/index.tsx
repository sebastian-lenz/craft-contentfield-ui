import * as React from 'react';

import Instance from '../../Instance';
import { InstanceField } from '../../../store/models';
import { WidgetProps } from '../registry';

export interface Props extends WidgetProps<InstanceField> {}

export default function InstanceWidget({ className, data, path }: Props) {
  return <Instance className={className} model={data} path={path} />;
}
