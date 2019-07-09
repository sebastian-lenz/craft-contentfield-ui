import * as React from 'react';
import cx from 'classnames';

import { TextField } from './index';
import { WidgetProps } from '../FieldDefinition';

export interface Props extends WidgetProps<TextField> {}

export default function TextWidget({
  data,
  disabled,
  errors,
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
      value={data ? `${data}` : ''}
    />
  );
}
