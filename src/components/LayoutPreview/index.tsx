import * as React from 'react';
import cx from 'classnames';

import Grid from './Grid';
import translate from '../../store/utils/translate';
import {
  ColumnPreset,
  getBreakpointValue,
  LayoutBreakpoint,
} from '../../fields/Layout/Layout';

import './index.styl';

export interface Props {
  breakpoints: Array<LayoutBreakpoint>;
  columns: Array<ColumnPreset>;
  columnsPerRow: number;
  current: LayoutBreakpoint;
  isSelected?: boolean;
  onClick?: () => void;
}

export function getColumnName(index: number) {
  const char = String.fromCharCode(65 + (index % 25));
  const num = Math.floor(index / 25);
  return translate('Column {num}', { num: `${char}${num > 1 ? num : ''}` });
}

export default function LayoutPreview({
  columns,
  columnsPerRow: perRow,
  isSelected,
  onClick,
  ...props
}: Props) {
  return (
    <div
      className={cx('tcfLayoutPreview', { isClickable: !!onClick, isSelected })}
      onClick={onClick}
    >
      <Grid columnsPerRow={perRow} />

      {columns.map((column, index) => {
        const offset = getBreakpointValue(column.offset, props);
        const order = getBreakpointValue(column.order, props);
        const width = getBreakpointValue(column.width, props);

        return (
          <div
            className="tcfLayoutPreview--col"
            key={index}
            style={{
              marginLeft: `${((offset / perRow) * 100).toFixed(6)}%`,
              order,
              width: `${((width / perRow) * 100).toFixed(6)}%`,
            }}
          >
            <div className="tcfLayoutPreview--colPanel">
              {getColumnName(index)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
