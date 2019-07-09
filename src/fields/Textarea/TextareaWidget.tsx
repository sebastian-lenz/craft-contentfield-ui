import * as React from 'react';

import { TextareaField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<TextareaField> {}

export default function TextareaWidget({ data, disabled, onUpdate }: Props) {
  return (
    <textarea
      className="tcfTextareaWidget text fullwidth"
      disabled={disabled}
      onChange={event => onUpdate(event.target.value)}
      value={data}
    />
  );
}
