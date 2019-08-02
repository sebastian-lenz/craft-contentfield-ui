import * as React from 'react';
import cx from 'classnames';

import { NumberField } from './index';
import { WidgetProps } from '../FieldDefinition';

function parseNumber(
  { dataType, defaultValue }: NumberField,
  value: string
): number {
  let result = dataType === 'integer' ? parseInt(value) : parseFloat(value);
  if (!isFinite(result)) {
    result = defaultValue;
  }

  return result;
}

export interface Props extends WidgetProps<NumberField> {}

export default function TextWidget({
  data,
  disabled,
  errors,
  field,
  onUpdate,
}: Props) {
  const { defaultValue, max, min, placeholder } = field;

  return (
    <input
      autoComplete="off"
      className={cx('tcfTextWidget text fullwidth', {
        error: errors && errors.length,
      })}
      disabled={disabled}
      max={max}
      min={min}
      onChange={event => onUpdate(parseNumber(field, event.target.value))}
      placeholder={placeholder}
      type="number"
      value={typeof data ? data : defaultValue}
    />
  );
}
