import * as React from 'react';

import EditableColumn from './EditableColumn';
import Grid from '../LayoutPreview/Grid';
import {
  Column,
  ColumnPreset,
  LayoutBreakpoint,
  LayoutConstraints,
} from '../../fields/Layout/Layout';

import './index.styl';

export interface Props {
  current: LayoutBreakpoint;
  breakpoints: Array<LayoutBreakpoint>;
  columns: Array<Column>;
  columnsPerRow: number;
  constraints: LayoutConstraints;
  onSelect: (uid: string) => void;
  onUpdate: (uid: string, data: Partial<ColumnPreset>) => void;
  selected: Column | null;
}

export default function EditableRow({ columns, selected, ...props }: Props) {
  const { columnsPerRow } = props;

  return (
    <div className="tcfLayoutRowEditor">
      <Grid columnsPerRow={columnsPerRow} />
      {columns.map((column, index) => (
        <EditableColumn
          {...props}
          column={column}
          index={index}
          isSelected={selected !== null && selected.__uuid === column.__uuid}
          key={column.__uuid}
        />
      ))}
    </div>
  );
}
