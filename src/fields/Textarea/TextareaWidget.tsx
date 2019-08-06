import * as React from 'react';
import cx from 'classnames';

import { TextareaField } from './index';
import { WidgetProps } from '../FieldDefinition';

import './TextareaWidget.styl';

export interface Props extends WidgetProps<TextareaField> {}

export default function TextareaWidget({
  data,
  disabled,
  field: { maxLength, minLength, monospace, placeholder, rows },
  onUpdate,
}: Props) {
  return (
    <textarea
      className={cx('tcfTextareaWidget text fullwidth', { monospace })}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
      onChange={event => onUpdate(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      value={data}
    />
  );
}
