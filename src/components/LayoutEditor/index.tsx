import * as React from 'react';

import Button from '../Button';
import Icon from '../Icon';
import Row from './Row';
import Text from '../Text';
import Window from '../Window';
import {
  Column,
  ColumnPreset,
  LayoutBreakpoint,
  LayoutConstraints,
} from '../../fields/Layout/Layout';

import './index.styl';

export interface Props {
  breakpoints: Array<LayoutBreakpoint>;
  columns: Array<Column>;
  columnsPerRow: number;
  constraints: LayoutConstraints;
  onClose: () => void;
  onCreate: () => string | null;
  onDelete: (uid: string) => void;
  onUpdate: (uid: string, data: Partial<ColumnPreset>) => void;
}

export default function LayoutEditor({
  onClose,
  onCreate,
  onDelete,
  ...props
}: Props) {
  const {
    breakpoints,
    columns,
    constraints: { maxColumns, minColumns },
  } = props;

  const [uid, setUid] = React.useState<string | null>(
    columns.length ? columns[0].__uuid : null
  );

  const selected = uid
    ? columns.find((column) => column.__uuid === uid) || null
    : null;

  function onSelect(value: string | null) {
    setUid(value === uid ? null : value);
  }

  return (
    <Window>
      <Window.Content>
        <div className="tcfLayoutEditor--title">
          <Text value="Edit columns" />
        </div>

        {breakpoints.map((breakpoint) => (
          <Row
            {...props}
            current={breakpoint}
            key={breakpoint.key}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
      </Window.Content>
      <Window.Footer>
        <div className="btngroup">
          {columns.length < maxColumns ? (
            <Button onClick={() => setUid(onCreate())}>
              <Icon name="plus" />
              <Text value="Create" />
            </Button>
          ) : null}

          {selected && columns.length > minColumns ? (
            <Button onClick={() => onDelete(selected.__uuid)}>
              <Icon name="minus" />
              <Text value="Delete" />
            </Button>
          ) : null}
        </div>

        <Button onClick={onClose} primary>
          <Text value="Close" />
        </Button>
      </Window.Footer>
    </Window>
  );
}
