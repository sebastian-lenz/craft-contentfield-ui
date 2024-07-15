import type { Field } from '../../store/models';

export interface Point {
  x: number;
  y: number;
}

export interface Rectangle extends Point {
  width: number;
  height: number;
}

export type Hotspot = Array<AnyHotspotShape>;

export type HotspotShapeType = 'point' | 'rectangle';

export interface HotspotShape {
  type: HotspotShapeType;
  uuid: string;
}

export interface HotspotPointShape extends HotspotShape {
  type: 'point';
  x: number;
  y: number;
}

export interface HotspotRectangleShape extends HotspotShape {
  type: 'rectangle';
  height: number;
  x: number;
  y: number;
  width: number;
}

export type AnyHotspotShape = HotspotPointShape | HotspotRectangleShape;

export interface HotspotField extends Field {
  allowedShapes?: Array<HotspotShapeType>;
  assetQuery: Array<string>;
  maxShapes?: number;
  minShapes?: number;
  type: 'hotspot';
}
