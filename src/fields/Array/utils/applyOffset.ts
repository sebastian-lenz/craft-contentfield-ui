import { DropTargetMonitor } from 'react-dnd';
import { MutableRefObject } from 'react';

import { MoveInfo } from '../../../store/utils/canMove';

export default function applyOffset(
  info: MoveInfo | null,
  monitor: DropTargetMonitor,
  ref: MutableRefObject<HTMLElement | null>
): MoveInfo | null {
  const { current } = ref;
  const clientOffset = monitor.getClientOffset();
  if (!current || !clientOffset || !info) {
    return null;
  }

  const { bottom, top } = current.getBoundingClientRect();
  const hoverClientY = clientOffset.y - top;
  if (current.classList.contains('isExpanded')) {
    if (hoverClientY > 32 && hoverClientY < bottom - top - 32) {
      return null;
    }
  }

  const hoverMiddleY = (bottom - top) / 2;
  if (hoverClientY > hoverMiddleY) {
    info.targetSegment = {
      ...info.targetSegment,
      index: info.targetSegment.index + 1,
    };
  }

  return info;
}
