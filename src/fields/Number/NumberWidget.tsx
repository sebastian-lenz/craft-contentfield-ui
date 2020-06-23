import * as React from 'react';
import cx from 'classnames';

import { NumberField } from './index';
import { WidgetProps } from '../FieldDefinition';

import './NumberWidget.styl';

function parseNumber(
  { dataType, defaultValue, max, min, optional }: NumberField,
  value: string
): number | null {
  let result = dataType === 'integer' ? parseInt(value) : parseFloat(value);
  if (!isFinite(result)) {
    if (optional) {
      return null;
    } else {
      result = defaultValue;
    }
  } else {
    if (typeof max === 'number' && result > max) {
      result = max;
    }

    if (typeof min === 'number' && result < min) {
      result = min;
    }
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
  const [hasFocus, setFocus] = React.useState(false);
  const [userValue, setUserValue] = React.useState(data);

  const { max, min, placeholder, unit } = field;
  const value = hasFocus ? userValue : data;

  function handleBlur() {
    setFocus(false);
    setUserValue(data);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setUserValue(value);
    onUpdate(parseNumber(field, value));
  }

  function handleFocus() {
    setFocus(true);
  }

  const input = (
    <input
      autoComplete="off"
      className={cx('tcfNumberWidget--input text fullwidth', {
        error: errors && errors.length,
      })}
      disabled={disabled}
      max={max === null ? undefined : max}
      min={min === null ? undefined : min}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={placeholder}
      type="number"
      value={value}
    />
  );

  return unit ? (
    <div className="tcfNumberWidget">
      {input}
      <div className="tcfNumberWidget--unit">{unit}</div>
    </div>
  ) : (
    input
  );
}
