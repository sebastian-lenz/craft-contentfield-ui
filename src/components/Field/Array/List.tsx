import * as React from 'react';
import { connect } from 'react-redux';
import { ConnectDropTarget, DropTarget, DropTargetMonitor } from 'react-dnd';

import DefaultMember from './members/Default';
import InstanceMember from './members/Instance';
import { AnyField } from '../registry';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import { DragItem } from './members/dragSource';
import { moveModel } from '../../../store/actions';
import { MoveModelOptions } from '../../../store/actions/moveModel';

function getElementIndex(element: Element): number {
  let index = 0;

  while (element.previousElementSibling) {
    element = element.previousElementSibling;
    if (!element.classList.contains('tcfArrayWidgetMemberList--placeholder')) {
      index += 1;
    }
  }

  return index;
}

export interface ExternalProps {
  data: any;
  field: AnyField;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
  path: Array<AnyPathSegment>;
}

export interface DropProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

export interface ReduxProps {
  onMove: (options: MoveModelOptions) => void;
}

export type Props = ExternalProps & DropProps & ReduxProps;

export interface State {
  dropIndex: number;
  placeholderHeight: number;
}

export class List extends React.PureComponent<Props, State> {
  element: HTMLElement | null = null;
  state: State = {
    dropIndex: -1,
    placeholderHeight: 0,
  };

  getDropIndex(monitor: DropTargetMonitor): number {
    const offset = monitor.getClientOffset();
    const container = this.element;
    const { data } = this.props;

    let dropIndex = Array.isArray(data) ? data.length : 0;

    if (container && offset) {
      let target: HTMLElement | null = document.elementFromPoint(
        offset.x,
        offset.y
      ) as HTMLElement;

      while (target) {
        if (target.parentElement !== container) {
          target = target.parentElement;
          continue;
        }

        if (
          target.classList.contains('tcfArrayWidgetMemberList--placeholder')
        ) {
          this.state.dropIndex;
        }

        const rect = target.getBoundingClientRect();
        const insertAfter = offset.y > rect.top + rect.height * 0.5;
        dropIndex = getElementIndex(target) + (insertAfter ? 1 : 0);
        break;
      }
    }

    return dropIndex;
  }

  handleDragHover(monitor: DropTargetMonitor) {
    this.setState({
      dropIndex: this.getDropIndex(monitor),
      placeholderHeight: monitor.getItem().height,
    });
  }

  render() {
    const { dropIndex, placeholderHeight } = this.state;
    const {
      children,
      connectDropTarget,
      data,
      field,
      isOver,
      onDelete,
      onUpdate,
      path,
    } = this.props;

    const items = Array.isArray(data) ? data : [];
    const component =
      field.type === 'instance' ? InstanceMember : DefaultMember;

    const members: Array<React.ReactElement<any>> = items.map((child, index) =>
      React.createElement(component, {
        child,
        field,
        index,
        key: '__uuid' in child ? child.__uuid : index,
        model: data,
        onDelete,
        onUpdate,
        path: [...path, { index, name: field.name, type: 'index' }],
      })
    );

    if (isOver) {
      const placeholder = (
        <div
          className="tcfArrayWidgetMemberList--placeholder"
          key="placeholder"
          style={{ height: placeholderHeight }}
        />
      );

      if (dropIndex <= 0) {
        members.unshift(placeholder);
      } else if (dropIndex >= items.length) {
        members.push(placeholder);
      } else {
        members.splice(dropIndex, 0, placeholder);
      }
    }

    let footer: React.ReactNode;
    if (members.length === 0) {
      members.push(
        <div className="tcfArrayWidget--empty" key="empty">
          {children}
        </div>
      );
    } else {
      footer = <div className="tcfArrayWidget--footer">{children}</div>;
    }

    return (
      <div className="tcfArrayWidget">
        {connectDropTarget(
          <div className="tcfArrayWidget--list" ref={this.setElement}>
            {members}
          </div>
        )}
        {footer}
      </div>
    );
  }

  setElement = (element: HTMLElement | null) => {
    this.element = element;
  };
}

const connection = connect(
  null,
  dispatch => ({
    onMove: (options: MoveModelOptions) => dispatch(moveModel(options)),
  })
);

const dropTarget = DropTarget<ExternalProps & ReduxProps, DropProps>(
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
          return false;
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

export default connection(dropTarget(List));
