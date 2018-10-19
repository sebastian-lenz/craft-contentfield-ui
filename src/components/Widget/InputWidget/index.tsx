import * as React from 'react';

import { StringField } from '../../../store/models';
import { WidgetProps } from '../registry';

export interface Props extends WidgetProps<StringField> {}

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
