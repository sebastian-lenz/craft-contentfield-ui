import * as React from 'react';

import ColumnInput from './ColumnInput';
import LayoutRowEditor, { Props } from '../LayoutRowEditor';
import Icon from '../Icon';

const icons: { [name: string]: string } = {
  xs: 'material:smartphone',
  sm: 'material:tablet_mac',
  md: 'material:tablet',
  lg: 'material:laptop',
  xl: 'material:desktop_mac',
};

export default function Row(props: Props) {
  const { columnsPerRow, constraints, current, selected } = props;
  let editor;

  if (selected) {
    const shared = {
      breakpoints: props.breakpoints,
      column: selected,
      current: props.current,
      onUpdate: props.onUpdate,
    };

    editor = (
      <div className="tcfLayoutEditor--rowAttributes">
        <ColumnInput
          {...shared}
          attribute="width"
          max={Math.min(columnsPerRow, constraints.maxColumnWidth)}
          min={Math.max(1, constraints.minColumnWidth)}
        />
        <ColumnInput
          {...shared}
          attribute="offset"
          min={0}
          max={columnsPerRow}
        />
        <ColumnInput {...shared} attribute="order" />
      </div>
    );
  } else {
    editor = <div className="tcfLayoutEditor--rowAttributes" />;
  }

  return (
    <div className="tcfLayoutEditor--row">
      <div className="tcfLayoutEditor--rowHead">
        {current.key in icons ? <Icon name={icons[current.key]} /> : null}
        <span>{current.label}</span>
      </div>
      <div className="tcfLayoutEditor--rowBody">
        <LayoutRowEditor {...props} />
        {editor}
      </div>
    </div>
  );
}
