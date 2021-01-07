import * as React from 'react';
import cx from 'classnames';

import Input from '../Input';
import {
  Column,
  ColumnPreset,
  getBreakpointValue,
  LayoutBreakpoint,
  setBreakpointValue,
} from '../../fields/Layout/Layout';

function ucFirst(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

interface VProps {
  attribute: 'offset' | 'order' | 'width';
  breakpoints: Array<LayoutBreakpoint>;
  column: Column;
  current: LayoutBreakpoint;
  max?: number;
  min?: number;
  onUpdate: (uid: string, data: Partial<ColumnPreset>) => void;
}

export default function ColumnInput({
  attribute,
  column,
  max,
  min,
  onUpdate,
  ...props
}: VProps) {
  const [inputValue, setInputValue] = React.useState<string | null>(null);
  const valueMap = column[attribute];
  const currentValue = getBreakpointValue(valueMap, props);
  const hasOwnValue = props.current.key in valueMap;

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(target.value);

    const nextValue = parseInt(target.value);
    if (
      !isFinite(nextValue) ||
      (typeof min === 'number' && nextValue < min) ||
      (typeof max === 'number' && nextValue > max)
    ) {
      return;
    }

    onUpdate(column.__uuid, {
      [attribute]: setBreakpointValue(valueMap, nextValue, props),
    });
  }

  return (
    <div className="tcfLayoutEditor--columnInput">
      <div className={cx('tcfLayoutEditor--columnInputLabel', { hasOwnValue })}>
        {ucFirst(attribute)}
      </div>
      <Input
        className="tcfLayoutEditor--columnInputField"
        max={max}
        min={min}
        onBlur={() => setInputValue(null)}
        onChange={onChange}
        type="number"
        value={inputValue === null ? currentValue : inputValue}
      />
    </div>
  );
}
