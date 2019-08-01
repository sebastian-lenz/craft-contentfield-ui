import * as React from 'react';
import cx from 'classnames';

import { TextField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<TextField> {}

export default function TextWidget({
  data,
  disabled,
  errors,
  field: { placeholder, inputType },
  onUpdate,
}: Props) {
  return (
    <input
      autoComplete="off"
      className={cx('tcfTextWidget text fullwidth', {
        error: errors && errors.length,
      })}
      disabled={disabled}
      onChange={event => onUpdate(event.target.value)}
      placeholder={placeholder}
      type={inputType}
      value={data ? `${data}` : ''}
    />
  );
}
