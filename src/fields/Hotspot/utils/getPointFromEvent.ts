import type { Point } from '../types';

export function getPointFromEvent(event: React.PointerEvent): Point {
  const point = { x: event.clientX, y: event.clientY };
  let target = event.target as Element | null;

  while (target) {
    if (target.nodeName === 'svg') {
      const rect = target.getBoundingClientRect();
      point.x -= rect.left;
      point.y -= rect.top;
      break;
    }

    target = target.parentElement;
  }

  return point;
}
