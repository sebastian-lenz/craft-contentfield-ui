import * as React from 'react';
import { useDrag as useDragBase, DragObjectWithType } from 'react-dnd';

import { AnyPathSegment } from '../../../store/utils/parsePath';
import isPathEqual from '../../../store/utils/isPathEqual';

export interface DragProps {
  child: any;
  disabled?: boolean;
  path: Array<AnyPathSegment>;
}

export interface DragItem extends DragObjectWithType {
  data: any;
  height: number;
  path: Array<AnyPathSegment>;
  type: 'MEMBER';
}

export default function useDrag(
  props: DragProps,
  ref: React.MutableRefObject<null | HTMLElement>
) {
  const item: DragItem = {
    data: props.child,
    height: 100,
    path: props.path,
    type: 'MEMBER',
  };

  return useDragBase({
    item,
    begin(): DragItem {
      return {
        data: props.child,
        height: ref.current ? ref.current.clientHeight : 100,
        path: props.path,
        type: 'MEMBER',
      };
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
      return isPathEqual(props.path, monitor.getItem().path);
    },
  });
}
