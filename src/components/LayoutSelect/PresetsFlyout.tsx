import * as React from 'react';

import Flyout from '../Flyout';
import { LayoutBreakpoint, LayoutPreset } from '../../fields/Layout/Layout';
import LayoutPreview from '../LayoutPreview';
import { checkPropTypes } from 'prop-types';

export interface Props {
  breakpoints: Array<LayoutBreakpoint>;
  columnsPerRow: number;
  current: LayoutBreakpoint;
  onClose: () => void;
  onPreset: (preset: LayoutPreset) => void;
  preset: string | null;
  presets: Array<LayoutPreset>;
}

export default function PresetsFlyout({
  onClose,
  onPreset,
  preset: selectedKey,
  presets,
  ...props
}: Props) {
  return (
    <Flyout onClick={onClose}>
      <div className="tcfLayoutSelect--flyout">
        {presets.map((preset) => (
          <LayoutPreview
            {...props}
            columns={preset.columns}
            isSelected={preset.key === selectedKey}
            key={preset.key}
            onClick={() => onPreset(preset)}
          />
        ))}
      </div>
    </Flyout>
  );
}
