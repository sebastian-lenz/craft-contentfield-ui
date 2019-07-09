import * as React from 'react';

import Select from '../../components/Select';
import { SelectField } from './index';
import { WidgetProps } from '../FieldDefinition';

export type Props = WidgetProps<SelectField>;

export default function SelectWidget({
  data,
  disabled,
  onUpdate,
  field,
}: Props) {
  return (
    <Select
      disabled={disabled}
      onChange={onUpdate}
      options={field.options}
      value={data}
    />
  );
}
