import * as React from 'react';

import uuid from '../../../../store/utils/uuid';
import { HotspotViewport, getPointFromEvent } from '../../utils';
import { useEvent } from '../../../../utils/useEvent';
import type { Point } from '../../types';
import type { ToolProps as Props } from './index';

export function toRectangle(
  lft: Point,
  rgt: Point,
  viewport: HotspotViewport | null = null
) {
  const scaleX = viewport ? 1 / viewport.width : 1;
  const scaleY = viewport ? 1 / viewport.height : 1;

  return {
    height: Math.abs(lft.y - rgt.y) * scaleY,
    width: Math.abs(lft.x - rgt.x) * scaleX,
    x: Math.min(lft.x, rgt.x) * scaleX,
    y: Math.min(lft.y, rgt.y) * scaleY,
  };
}

export function CreateRectangle(props: Props) {
  const [state, setState] = React.useState({
    active: false,
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
  });

  function onPointerDown(event: React.PointerEvent) {
    const point = getPointFromEvent(event);
    setState((state) => ({
      ...state,
      active: true,
      from: point,
      to: point,
    }));
  }

  function onPointerMove(event: React.PointerEvent) {
    setState((state) => ({
      ...state,
      to: getPointFromEvent(event),
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
        ...toRectangle(state.from, state.to, props.viewport),
        type: 'rectangle',
        uuid: uuid(),
      },
    ]);
  });

  return (
    <g>
      {state.active ? (
        <rect
          className="tcfHotspotEditor__shapeRectangle"
          {...toRectangle(state.from, state.to)}
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
