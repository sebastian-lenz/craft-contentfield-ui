import * as React from 'react';
import cx from 'classnames';

import Icon from '@app/components/Icon';
import { CreatePoint } from './tools/CreatePoint';
import { CreateRectangle } from './tools/CreateRectangle';
import type { AnyHotspotShape, HotspotShapeType } from '../types';
import type { Tool } from './tools';

export interface Props {
  allowCreate: boolean;
  allowDelete: boolean;
  allowedShapes?: Array<HotspotShapeType>;
  currentTool: any;
  onChange: (shapes: Array<AnyHotspotShape>) => void;
  onTool: (tool: Tool | null) => void;
}

export function Toolbar({
  allowCreate,
  allowDelete,
  allowedShapes,
  currentTool,
  onChange,
  onTool,
}: Props) {
  function allow(value: HotspotShapeType) {
    return !allowedShapes || allowedShapes.some((shape) => shape === value);
  }

  return (
    <div className="tcfHotspotEditor__toolbar">
      {allow('point') ? (
        <button
          className={cx('tcfHotspotEditor__toolbarButton', {
            active: currentTool === CreatePoint,
          })}
          disabled={!allowCreate}
          type="button"
          onClick={() => onTool({ Component: CreatePoint, props: {} })}
        >
          <Icon name="material:gps_fixed" />
          <span>Hotspot</span>
        </button>
      ) : null}

      {allow('rectangle') ? (
        <button
          className={cx('tcfHotspotEditor__toolbarButton', {
            active: currentTool === CreateRectangle,
          })}
          disabled={!allowCreate}
          type="button"
          onClick={() => onTool({ Component: CreateRectangle, props: {} })}
        >
          <Icon name="material:crop" />
          <span>Ausschnitt</span>
        </button>
      ) : null}

      <button
        className="tcfHotspotEditor__toolbarButton"
        disabled={!allowDelete}
        type="button"
        onClick={() => {
          onTool(null);
          onChange([]);
        }}
      >
        <Icon name="material:delete" />
        <span>Alle löschen</span>
      </button>
    </div>
  );
}
