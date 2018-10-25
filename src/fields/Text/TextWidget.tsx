import * as React from 'react';

import { TextField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<TextField> {}

export default function InputWidget({ data, onUpdate }: Props) {
  return (
    <input
      autoComplete="off"
      className="text fullwidth"
      onChange={event => onUpdate(event.target.value)}
      value={data}
    />
  );
}
