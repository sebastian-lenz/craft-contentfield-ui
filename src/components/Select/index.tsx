import * as React from 'react';

import './index.styl';

export interface Props<T> {
  allowUndecided?: boolean;
  options: Array<{ key: string; label: string; value: T }>;
  value: T | null;
  onChange: (value: T) => void;
}

export default function Select<T>({
  allowUndecided,
  options,
  value,
  onChange,
}: Props<T>) {
  const selectedIndex = options.findIndex(option => option.value === value);
  const hasUndecied = allowUndecided || selectedIndex === -1;

  return (
    <div className="tcfSelect select">
      <select
        className="tcfSelect--select"
        value={selectedIndex == -1 ? undefined : options[selectedIndex].key}
        onChange={event => {
          let index = event.target.selectedIndex;
          let value: T | null = null;
          if (hasUndecied) index -= 1;
          if (index >= 0 && index < options.length) {
            value = options[index].value;
          }
          if (value !== null || allowUndecided) {
            onChange(options[index].value);
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
