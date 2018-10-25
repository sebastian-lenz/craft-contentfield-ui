import * as React from 'react';

import './index.styl';

export interface SelectOption<T = any> {
  key: T;
  label: string;
}

export interface Props<Option extends SelectOption> {
  allowUndecided?: boolean;
  options: Array<Option>;
  value: Option['key'] | null;
  onChange: (value: Option['key']) => void;
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
    <div className="tcfSelect select">
      <select
        className="tcfSelect--select"
        value={selectedIndex == -1 ? undefined : options[selectedIndex].key}
        onChange={event => {
          let index = event.target.selectedIndex;
          let value: Option['key'] | null = null;
          if (hasUndecied) index -= 1;
          if (index >= 0 && index < options.length) {
            value = options[index].key;
          }
          if (value !== null || allowUndecided) {
            onChange(options[index].key);
          }
        }}
      >
        {hasUndecied ? <option>(None)</option> : null}
        {options.map((option, index) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
