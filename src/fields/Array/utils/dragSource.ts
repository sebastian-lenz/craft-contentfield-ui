import { DragSource, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import { AnyPathSegment } from '../../../store/utils/parsePath';
import { Field, Model, Schema } from '../../../store/models';

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

export interface ExternalProps<TChild, TField extends Field> {
  child: TChild;
  depth: number;
  disabled?: boolean;
  field: TField;
  index: number;
  isCollapsible: boolean;
  isCompact: boolean;
  model: Model;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
  path: Array<AnyPathSegment>;
  schema?: Schema;
}

export type Props<TChild, TField extends Field> = ExternalProps<
  TChild,
  TField
> &
  DragProps;

export default function<TChild, TField extends Field>(
  component: React.ComponentType<Props<TChild, TField>>
) {
  return DragSource<ExternalProps<TChild, TField>, DragProps>(
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
      canDrag(props) {
        return !props.disabled;
      },
    },
    (connect, monitor): DragProps => ({
      dragPreview: connect.dragPreview(),
      dragSource: connect.dragSource(),
      // @todo Remove cast to any once the declaration is up to date
      // @see https://github.com/react-dnd/react-dnd/pull/1478
      hasDropTarget:
        monitor.isDragging() && (monitor as any).getTargetIds().length > 0,
      isDragging: monitor.isDragging(),
    })
  )(component);
}
