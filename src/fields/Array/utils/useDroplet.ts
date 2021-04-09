import { useStore } from 'react-redux';
import { useDrop as useDropBase } from 'react-dnd';

import applyMoveShift from '../../../store/utils/applyMoveShift';
import canMove, { MoveInfo } from '../../../store/utils/canMove';
import { AnyField } from '../../index';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import { DragItem, dragType } from './useDrag';
import { moveModel } from '../../../store/actions';

function toMoveInfo(props: DropletProps, item: DragItem): MoveInfo | null {
  const sourcePath = item.path.slice();
  const sourceSegment = sourcePath.pop();
  if (!sourceSegment || sourceSegment.type !== 'index') {
    return null;
  }

  return {
    sourcePath,
    sourceSegment,
    targetPath: props.path,
    targetSegment: { type: 'index', index: 0, name: props.field.name },
  };
}

export interface DropletProps {
  field: AnyField;
  path: Array<AnyPathSegment>;
}

export default function useDrop(props: DropletProps) {
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

      const info = toMoveInfo(props, item);
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
