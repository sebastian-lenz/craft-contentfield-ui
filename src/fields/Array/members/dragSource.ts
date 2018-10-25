import { DragSource, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import { AnyField } from '../..';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import { Model } from '../../../store/models';

export interface DragItem {
  data: any;
  height: number;
  path: Array<AnyPathSegment>;
}

export interface DragProps {
  dragPreview: ConnectDragPreview;
  dragSource: ConnectDragSource;
  hasDropTarget: boolean;
  isDragging: boolean;
}

export interface ExternalProps {
  child: any;
  field: AnyField;
  index: number;
  model: Model;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
  path: Array<AnyPathSegment>;
}

export type Props = ExternalProps & DragProps;

export default DragSource<ExternalProps, DragProps>(
  'MEMBER',
  {
    beginDrag(props, monitor, component) {
      const element = findDOMNode(component) as Element;
      const item: DragItem = {
        data: props.child,
        height: element ? element.clientHeight : 0,
        path: props.path,
      };

      return item;
    },
  },
  (connect, monitor): DragProps => ({
    dragPreview: connect.dragPreview(),
    dragSource: connect.dragSource(),
    hasDropTarget: monitor.isDragging() && monitor.getTargetIds().length > 0,
    isDragging: monitor.isDragging(),
  })
);
