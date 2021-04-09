import { useStore } from 'react-redux';
import { useDrop as useDropBase } from 'react-dnd';
import { MutableRefObject } from 'react';

import applyMoveShift from '../../../store/utils/applyMoveShift';
import applyOffset from './applyOffset';
import canMove, { MoveInfo } from '../../../store/utils/canMove';
import { AnyField } from '../../index';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import { DragItem, dragType } from './useDrag';
import { moveModel } from '../../../store/actions';

function toMoveInfo(props: DropProps, item: DragItem): MoveInfo | null {
  const targetPath = props.path.slice();
  const targetSegment = targetPath.pop();
  if (!targetSegment || targetSegment.type !== 'index') {
    return null;
  }

  const sourcePath = item.path.slice();
  const sourceSegment = sourcePath.pop();
  if (!sourceSegment || sourceSegment.type !== 'index') {
    return null;
  }

  return {
    sourcePath,
    sourceSegment,
    targetPath,
    targetSegment,
  };
}

export interface DropProps {
  field: AnyField;
  path: Array<AnyPathSegment>;
}

export default function useDrop(
  props: DropProps,
  ref: MutableRefObject<HTMLElement | null>
) {
  const store = useStore();

  return useDropBase({
    accept: dragType,
    drop(item: DragItem) {
      return { item };
    },
    hover: (item: DragItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }

      const info = applyOffset(toMoveInfo(props, item), monitor, ref);
      if (!info || !canMove(store.getState(), info)) {
        return;
      }

      const action = moveModel(info);
      const { targetPath, targetSegment } = applyMoveShift(action);
      item.path = [...targetPath, targetSegment];
      store.dispatch(action);
    },
  });
}
