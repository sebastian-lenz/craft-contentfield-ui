import React from 'react';

import { Point, pointTransform } from './Point';
import { Rectangle, rectangleTransform } from './Rectangle';

import type { HotspotViewport } from '../../utils/useHotspotViewport';
import type {
  AnyHotspotShape,
  HotspotShape,
  HotspotShapeType,
  Point as PointType,
  Rectangle as RectangleType,
} from '../../types';

type ShapeMap<T> = { [name in HotspotShapeType]: T };

const shapes: ShapeMap<React.ComponentType<any>> = {
  point: Point,
  rectangle: Rectangle,
};

const transforms: ShapeMap<TransformAdapter> = {
  point: pointTransform,
  rectangle: rectangleTransform,
};

export interface TransformAdapter<T extends HotspotShape = HotspotShape> {
  scale(shape: T, delta: PointType, handle: PointType): T;
  toBounds(
    viewport: HotspotViewport,
    shape: T,
    isPreview?: boolean
  ): RectangleType;
}

export interface ShapeProps<T extends HotspotShape = HotspotShape> {
  isPreview?: boolean;
  onSelect?: (shape: T, origin?: PointType | null) => void;
  shape: T;
  viewport: HotspotViewport;
}

export function createShapes(
  values: Array<AnyHotspotShape>,
  props: Omit<ShapeProps, 'shape'>
) {
  return values.map((value) =>
    React.createElement(shapes[value.type], {
      ...props,
      key: value.uuid,
      shape: value,
    })
  );
}

export function getTransformAdapter<T extends HotspotShape>(
  shape: T
): TransformAdapter<T> {
  return transforms[shape.type] as any;
}
