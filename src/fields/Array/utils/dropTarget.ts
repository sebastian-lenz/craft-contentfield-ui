import { DropTarget } from 'react-dnd';

import { DragItem } from './dragSource';
import { DropProps, ExternalProps, ReduxProps, List } from '../List';

export default DropTarget<ExternalProps & ReduxProps, DropProps>(
  'MEMBER',
  {
    canDrop: (props, monitor) => {
      const { data } = monitor.getItem() as DragItem;
      switch (props.field.type) {
        case 'instance':
          return (
            data &&
            typeof data === 'object' &&
            '__type' in data &&
            props.field.schemas.indexOf(data.__type) !== -1
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
