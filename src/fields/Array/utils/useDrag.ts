import * as React from 'react';
import { useDrag as useDragBase } from 'react-dnd';

import { AnyPathSegment } from '../../../store/utils/parsePath';
import isPathEqual from '../../../store/utils/isPathEqual';

export const dragType = 'tcf:Member';

export interface DragProps {
  child: any;
  disabled?: boolean;
  path: Array<AnyPathSegment>;
}

export interface DragItem {
  data: any;
  height: number;
  path: Array<AnyPathSegment>;
}

export default function useDrag(
  props: DragProps,
  ref: React.MutableRefObject<null | HTMLElement>
) {
  return useDragBase({
    type: dragType,
    item() {
      return {
        data: props.child,
        height: ref.current ? ref.current.clientHeight : 100,
        path: props.path,
      } as DragItem;
    },
    canDrag() {
      return !props.disabled;
    },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    isDragging(monitor) {
      return isPathEqual(props.path, monitor.getItem<DragItem>().path);
    },
  });
}
