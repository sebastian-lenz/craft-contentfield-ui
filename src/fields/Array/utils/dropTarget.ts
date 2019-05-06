import { DropTarget } from 'react-dnd';

import isPathEqual from '../../../store/utils/isPathEqual';
import { DragItem } from './dragSource';
import { DropProps, ExternalProps, ReduxProps, List } from '../List';
import isModel from '../../../store/utils/isModel';

export default DropTarget<ExternalProps & ReduxProps, DropProps>(
  'MEMBER',
  {
    canDrop: (props, monitor) => {
      const { data: itemData, path: itemPath } = monitor.getItem() as DragItem;
      const { data, field, limit, path } = props;

      const itemParentPath = itemPath.slice();
      const itemSegment = itemParentPath.pop();
      const isSameField =
        itemSegment &&
        itemSegment.type === 'index' &&
        isPathEqual(itemParentPath, path) &&
        field.name === itemSegment.name;

      if (!isSameField && limit > 0 && data.length >= limit) {
        return false;
      }

      switch (props.field.type) {
        case 'instance':
          return (
            isModel(itemData) &&
            props.field.schemas.indexOf(itemData.__type) !== -1
          );
        default:
          return true;
      }
    },
    drop: (props, monitor, component: List) => {
      if (!monitor.didDrop()) {
        const item = monitor.getItem() as DragItem;
        props.onMove({
          source: item.path,
          target: props.path,
          targetField: props.field.name,
          targetIndex: component.getDropIndex(monitor),
        });

        return { executed: true };
      }
    },
    hover: (props, monitor, component: List) => {
      component.handleDragHover(monitor);
    },
  },
  (connect, monitor): DropProps => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
  })
);
