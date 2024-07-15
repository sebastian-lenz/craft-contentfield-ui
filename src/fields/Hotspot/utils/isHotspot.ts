import type { Hotspot, HotspotShape } from '../types';

export function isHotspot(value: any): value is Hotspot {
  return Array.isArray(value) && value.every(isHotspotShape);
}

export function isHotspotShape(value: any): value is HotspotShape {
  return (
    value && typeof value === 'object' && 'type' in value && 'uuid' in value
  );
}
