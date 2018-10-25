import * as React from 'react';

import { TextareaField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<TextareaField> {}

export default function TextareaWidget({ data, onUpdate }: Props) {
  return (
    <textarea
      className="text fullwidth"
      onChange={event => onUpdate(event.target.value)}
      value={data}
    />
  );
}
