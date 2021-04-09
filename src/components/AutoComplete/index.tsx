import * as React from 'react';
import cx from 'classnames';

let nextId = 0;

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  suggestions: Array<string>;
};

export default function AutoComplete({
  className,
  suggestions,
  ...props
}: Props) {
  const [id] = React.useState(`tcfAutoCompleteList_${nextId++}`);

  return (
    <>
      <input className={cx('tcfInput', className)} list={id} {...props} />
      <datalist id={id}>
        {suggestions.map((suggestion, index) => (
          <option key={index}>{suggestion}</option>
        ))}
      </datalist>
    </>
  );
}
