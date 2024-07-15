import * as React from 'react';

import type { HotspotPointShape } from '../../types';
import type { ShapeProps, TransformAdapter } from '.';

export const radius = 16;

export const pointTransform: TransformAdapter<HotspotPointShape> = {
  scale(shape, delta) {
    return {
      ...shape,
      x: shape.x + delta.x,
      y: shape.y + delta.y,
    };
  },
  toBounds(viewport, shape) {
    return {
      height: radius * 2,
      width: radius * 2,
      x: shape.x * viewport.width - radius,
      y: shape.y * viewport.height - radius,
    };
  },
};

export function Point({
  isPreview,
  onSelect,
  shape,
  viewport,
}: ShapeProps<HotspotPointShape>) {
  return (
    <circle
      className="tcfHotspotEditor__shapePoint"
      cx={shape.x * viewport.width}
      cy={shape.y * viewport.height}
      onPointerDown={
        onSelect
          ? (e) => onSelect(shape, { x: e.screenX, y: e.screenY })
          : undefined
      }
      r={isPreview ? 5 : radius}
    />
  );
}
