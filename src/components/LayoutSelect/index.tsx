import * as React from 'react';

import Icon from '../Icon';
import LayoutEditor from '../LayoutEditor';
import LayoutPreview from '../LayoutPreview';
import Overlay from '../Overlay';
import {
  Column,
  ColumnPreset,
  LayoutBreakpoint,
  LayoutConstraints,
  LayoutPreset,
} from '../../fields/Layout/Layout';

import './index.styl';
import PresetsFlyout from './PresetsFlyout';

export type LayoutSelectMode = null | 'flyout' | 'editor';

export interface Props {
  canEdit?: boolean;
  constraints: LayoutConstraints;
  breakpoints: Array<LayoutBreakpoint>;
  columns: Array<Column>;
  columnsPerRow: number;
  onCreate: () => string | null;
  onDelete: (uid: string) => void;
  onPreset: (preset: LayoutPreset) => void;
  onUpdate: (uid: string, data: Partial<ColumnPreset>) => void;
  preset: string | null;
  presets: Array<LayoutPreset>;
}

export default function LayoutSelect({
  canEdit,
  onPreset,
  preset,
  presets,
  ...props
}: Props) {
  const { breakpoints, columns, columnsPerRow } = props;
  const [mode, setMode] = React.useState<LayoutSelectMode>(null);
  const maxBreakpoint = breakpoints[breakpoints.length - 1];

  function handleClose() {
    setMode(null);
  }

  function handlePreset(preset: LayoutPreset) {
    onPreset(preset);
    setMode(null);
  }

  let clickMode: LayoutSelectMode | null = null;
  if (presets.length) {
    clickMode = 'flyout';
  } else if (canEdit) {
    clickMode = 'editor';
  }

  return (
    <div className="tcfLayoutSelect">
      <div className="tcfLayoutSelect--widget">
        <LayoutPreview
          breakpoints={breakpoints}
          columns={columns}
          columnsPerRow={columnsPerRow}
          current={maxBreakpoint}
          onClick={clickMode ? () => setMode(clickMode) : undefined}
        />

        {mode === 'flyout' ? (
          <PresetsFlyout
            breakpoints={props.breakpoints}
            columnsPerRow={props.columnsPerRow}
            current={maxBreakpoint}
            onClose={handleClose}
            onPreset={handlePreset}
            preset={preset}
            presets={presets}
          />
        ) : null}
      </div>

      {canEdit ? (
        <div
          className="tcfLayoutSelect--edit"
          onClick={() => setMode('editor')}
        >
          <Icon name="material:edit" />
        </div>
      ) : null}

      {mode === 'editor' ? (
        <Overlay onClick={handleClose}>
          <LayoutEditor {...props} onClose={handleClose} />
        </Overlay>
      ) : null}
    </div>
  );
}
