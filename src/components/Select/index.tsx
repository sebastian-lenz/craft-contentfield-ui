import * as React from 'react';

import './index.styl';

export interface SelectOption<T = any> {
  indent?: number;
  key: T;
  label: string;
}

export interface Props<Option extends SelectOption> {
  allowUndecided?: boolean;
  options: Array<Option>;
  value: Option['key'] | null;
  onChange: (value: Option['key']) => void;
}

export function sortOptions(left: SelectOption, right: SelectOption): number {
  return left.label.localeCompare(right.label);
}

export default function Select<Option extends SelectOption>({
  allowUndecided,
  options,
  value,
  onChange,
}: Props<Option>) {
  const selectedIndex = options.findIndex(option => option.key === value);
  const hasUndecied = allowUndecided || selectedIndex === -1;

  return (
    <div className="tcfSelect">
      <select
        className="tcfSelect--select"
        value={selectedIndex == -1 ? undefined : selectedIndex}
        onChange={event => {
          let index = event.target.selectedIndex;
          let value: Option['key'] | null = null;
          if (hasUndecied) index -= 1;
          if (index >= 0 && index < options.length) {
            value = options[index].key;
          }
          if (value !== null || allowUndecided) {
            onChange(value);
          }
        }}
      >
        {hasUndecied ? <option>(None)</option> : null}
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
