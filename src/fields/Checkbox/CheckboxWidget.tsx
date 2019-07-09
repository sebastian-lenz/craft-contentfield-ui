import * as React from 'react';

import Checkbox from '../../components/Checkbox';
import { CheckboxField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<CheckboxField> {}

export default function CheckboxWidget({
  data,
  disabled,
  field,
  onUpdate,
}: Props) {
  return (
    <Checkbox disabled={disabled} onChange={onUpdate} value={!!data}>
      {field.label}
    </Checkbox>
  );
}
