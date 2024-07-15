import * as React from 'react';

import uuid from '../../../../store/utils/uuid';
import { getPointFromEvent } from '../../utils';
import { radius } from '../shapes/Point';
import { useEvent } from '../../../../utils/useEvent';
import type { ToolProps as Props } from './index';

export function CreatePoint(props: Props) {
  const [state, setState] = React.useState({
    active: false,
    x: 0,
    y: 0,
  });

  function onPointerDown(event: React.PointerEvent) {
    setState((state) => ({
      ...state,
      ...getPointFromEvent(event),
      active: true,
    }));
  }

  function onPointerMove(event: React.PointerEvent) {
    setState((state) => ({
      ...state,
      ...getPointFromEvent(event),
    }));
  }

  useEvent(window, 'pointerup', () => {
    if (!state.active) {
      return;
    }

    props.onTool(null);
    props.onChange([
      ...props.shapes,
      {
        type: 'point',
        uuid: uuid(),
        x: state.x / props.viewport.width,
        y: state.y / props.viewport.height,
      },
    ]);
  });

  return (
    <g>
      {state.active ? (
        <circle
          className="tcfHotspotEditor__shapePoint"
          r={radius}
          cx={state.x}
          cy={state.y}
        />
      ) : null}

      <rect
        fillOpacity="0"
        x="0"
        y="0"
        width="100%"
        height="100%"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      />
    </g>
  );
}
