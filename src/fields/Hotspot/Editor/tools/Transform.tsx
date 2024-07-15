import * as React from 'react';

import { getTransformAdapter } from '../shapes';
import { useEvent } from '../../../../utils/useEvent';
import type { AnyHotspotShape, Point } from '../../types';
import type { ToolProps } from './index';

const handleSize = 12;
const handles = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export interface Props extends ToolProps {
  origin: Point | null;
  uuid: string;
}

export interface State {
  handle: Point;
  mode: null | 'translate' | 'scale';
  origin: Point;
  shape: AnyHotspotShape;
}

export function Transform(props: Props) {
  const shape = props.shapes.find((shape) => shape.uuid === props.uuid);
  if (!shape) {
    return null;
  }

  const { viewport } = props;
  const adapter = getTransformAdapter(shape);
  const bounds = adapter.toBounds(viewport, shape);

  const [state, setState] = React.useState<State>({
    handle: { x: 0, y: 0 },
    mode: props.origin ? 'translate' : null,
    origin: props.origin || { x: 0, y: 0 },
    shape,
  });

  const onBeginTranslate = (event: React.PointerEvent) => {
    setState((state) => ({
      ...state,
      mode: 'translate',
      origin: { x: event.screenX, y: event.screenY },
      shape,
    }));
  };

  const onBeginScale = (event: React.PointerEvent, handle: Point) => {
    setState((state) => ({
      ...state,
      handle,
      mode: 'scale',
      origin: { x: event.screenX, y: event.screenY },
      shape,
    }));
  };

  const updateShape = (shape: AnyHotspotShape | null) => {
    props.onChange([
      ...props.shapes.filter((shape) => shape.uuid !== state.shape.uuid),
      ...(shape ? [shape] : []),
    ]);
  };

  useEvent(props.svg, 'pointermove', ({ screenX, screenY }: PointerEvent) => {
    const { origin, shape } = state;
    const deltaX = (screenX - origin.x) / viewport.width;
    const deltaY = (screenY - origin.y) / viewport.height;

    if (state.mode === 'translate') {
      updateShape({
        ...shape,
        x: shape.x + deltaX,
        y: shape.y + deltaY,
      });
    } else if (state.mode === 'scale') {
      updateShape(adapter.scale(shape, { x: deltaX, y: deltaY }, state.handle));
    }
  });

  useEvent(window, 'pointerup', () => {
    setState((state) => ({ ...state, mode: null }));
  });

  useEvent(window, 'keydown', ({ key }: KeyboardEvent) => {
    if (key === 'Delete') {
      props.onTool(null);
      updateShape(null);
    }
  });

  return (
    <g>
      <rect
        className="tcfHotspotEditor__hitArea"
        onPointerDown={onBeginTranslate}
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
      />

      {handles.map((handle, index) => (
        <rect
          className="tcfHotspotEditor__handle"
          key={`handle_${index}`}
          onPointerDown={(event) => onBeginScale(event, handle)}
          height={handleSize}
          width={handleSize}
          x={bounds.x + (handle.x ? bounds.width : -handleSize)}
          y={bounds.y + (handle.y ? bounds.height : -handleSize)}
        />
      ))}
    </g>
  );
}
