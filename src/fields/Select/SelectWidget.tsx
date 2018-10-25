import * as React from 'react';

import Select from '../../components/Select';
import { SelectField } from './index';
import { WidgetProps } from '../FieldDefinition';

export type Props = WidgetProps<SelectField>;

export default function SelectWidget({ data, onUpdate, field }: Props) {
  return <Select onChange={onUpdate} options={field.options} value={data} />;
}
