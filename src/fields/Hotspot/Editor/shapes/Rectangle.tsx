import * as React from 'react';

import { toRectangle } from '../tools/CreateRectangle';
import type { ShapeProps, TransformAdapter } from './index';
import type {
  HotspotRectangleShape,
  Point,
  Rectangle as RectangleType,
} from '../../types';

function inv(edge: Point): Point {
  return { x: edge.x ? 0 : 1, y: edge.y ? 0 : 1 };
}

function toEdge(rect: RectangleType, edge: Point) {
  return {
    x: rect.x + rect.width * edge.x,
    y: rect.y + rect.height * edge.y,
  };
}

export const rectangleTransform: TransformAdapter<HotspotRectangleShape> = {
  scale(shape, delta, handle) {
    const lft = toEdge(shape, handle);
    const rgt = toEdge(shape, inv(handle));
    lft.x += delta.x;
    lft.y += delta.y;

    return {
      ...shape,
      ...toRectangle(lft, rgt),
    };
  },
  toBounds(viewport, shape, isPreview?: boolean) {
    const height = shape.height * viewport.height;
    const width = shape.width * viewport.width;
    const growX = isPreview ? 0 : Math.max(0, 32 - width);
    const growY = isPreview ? 0 : Math.max(0, 32 - height);

    return {
      height: height + growY,
      width: width + growX,
      x: shape.x * viewport.width - growX * 0.5,
      y: shape.y * viewport.height - growY * 0.5,
    };
  },
};

export function Rectangle({
  isPreview,
  onSelect,
  shape,
  viewport,
}: ShapeProps<HotspotRectangleShape>) {
  return (
    <rect
      className="tcfHotspotEditor__shapeRectangle"
      onPointerDown={
        onSelect
          ? (e) => onSelect(shape, { x: e.screenX, y: e.screenY })
          : undefined
      }
      {...rectangleTransform.toBounds(viewport, shape, isPreview)}
    />
  );
}
