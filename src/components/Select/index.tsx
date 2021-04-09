import * as React from 'react';
import cx from 'classnames';

import translate from '../../store/utils/translate';

import './index.styl';

export interface SelectOption<T = any> {
  indent?: number;
  key: T;
  label: string;
}

export interface Props<Option extends SelectOption> {
  allowUndecided?: boolean;
  className?: string;
  disabled?: boolean;
  options: Array<Option>;
  selectClassName?: string;
  value: Option['key'] | null;
  onChange: (value: Option['key']) => void;
}

export function sortOptions(left: SelectOption, right: SelectOption): number {
  return left.label.localeCompare(right.label);
}

export default function Select<Option extends SelectOption>({
  allowUndecided,
  className,
  disabled = false,
  options,
  selectClassName,
  value,
  onChange,
}: Props<Option>) {
  // Don't use a strict equal here, the value might be boxed.
  const selectedIndex = options.findIndex((option) => option.key == value);
  const hasUndecied = allowUndecided || selectedIndex === -1;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let index = event.target.selectedIndex;
    let value: Option['key'] | null = null;
    if (hasUndecied) index -= 1;
    if (index >= 0 && index < options.length) {
      value = options[index].key;
    }

    if (value !== null || allowUndecided) {
      onChange(value);
    }
  }

  return (
    <div className={cx('tcfSelect', className)}>
      <select
        className={cx('tcfSelect--select', selectClassName)}
        disabled={disabled}
        value={selectedIndex == -1 ? undefined : selectedIndex}
        onChange={disabled ? undefined : handleChange}
      >
        {hasUndecied ? <option>{translate('(No selection)')}</option> : null}
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option.indent ? '--'.repeat(option.indent) + ' ' : null}
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
