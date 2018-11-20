import * as React from 'react';
import { connect } from 'react-redux';
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd';

import dropTarget from '../utils/dropTarget';
import moveModel, { MoveModelOptions } from '../../../store/actions/moveModel';
import InstanceMember from '../InstanceMember';
import isModel from '../../../store/utils/isModel';
import { AnyField } from '../../index';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import { RootState, Schemas } from '../../../store/models';
import { toggleExpanded } from '../../../store/actions';

import './index.styl';
import DefaultMember from '../DefaultMember';

function getElementIndex(element: Element): number {
  let index = 0;

  while (element.previousElementSibling) {
    element = element.previousElementSibling;
    if (!element.classList.contains('tcfArrayWidgetList--placeholder')) {
      index += 1;
    }
  }

  return index;
}

export interface ExternalProps {
  data: any;
  field: AnyField;
  isCollapsible: boolean;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
  path: Array<AnyPathSegment>;
}

export interface DropProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

export interface ReduxProps {
  expanded: Array<string>;
  schemas: Schemas;
  onMove: (options: MoveModelOptions) => void;
  onToggleExpanded: (uuid: string) => void;
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

        if (target.classList.contains('tcfArrayWidgetList--placeholder')) {
          return this.state.dropIndex;
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
    const { children, connectDropTarget, isOver } = this.props;
    const members = this.renderMembers();

    if (isOver) {
      const placeholder = (
        <div
          className="tcfArrayWidgetList--placeholder"
          key="placeholder"
          style={{ height: placeholderHeight }}
        />
      );

      if (dropIndex <= 0) {
        members.unshift(placeholder);
      } else if (dropIndex >= members.length) {
        members.push(placeholder);
      } else {
        members.splice(dropIndex, 0, placeholder);
      }
    }

    let footer: React.ReactNode;
    if (members.length === 0) {
      members.push(
        <div className="tcfArrayWidgetList--empty" key="empty">
          {children}
        </div>
      );
    } else {
      footer = <div className="tcfArrayWidgetList--footer">{children}</div>;
    }

    return (
      <>
        {connectDropTarget(
          <div className="tcfArrayWidgetList" ref={this.setElement}>
            {members}
          </div>
        )}
        {footer}
      </>
    );
  }

  renderMembers(): Array<React.ReactElement<any>> {
    const {
      data,
      expanded,
      field,
      isCollapsible,
      onDelete,
      onToggleExpanded,
      onUpdate,
      path: parentPath,
      schemas,
    } = this.props;

    const items = Array.isArray(data) ? data : [];

    return items.map((child, index) => {
      const path: Array<AnyPathSegment> = [
        ...parentPath,
        { index, name: field.name, type: 'index' },
      ];

      const props = {
        index,
        isCollapsible,
        key: '__uuid' in child ? child.__uuid : index,
        model: data,
        onDelete,
        onToggleExpanded,
        onUpdate,
        path,
      };

      if (isModel(child) && field.type === 'instance') {
        return (
          <InstanceMember
            {...props}
            child={child}
            field={field}
            isExpanded={expanded.indexOf(child.__uuid) !== -1}
            schema={schemas[child.__type]}
          />
        );
      } else {
        return <DefaultMember {...props} isExpanded />;
      }
    });
  }

  setElement = (element: HTMLElement | null) => {
    this.element = element;
  };
}

const connection = connect(
  (state: RootState) => ({
    expanded: state.config.expanded,
    schemas: state.schemas,
  }),
  dispatch => ({
    onMove: (options: MoveModelOptions) => dispatch(moveModel(options)),
    onToggleExpanded: (uuid: string) => dispatch(toggleExpanded(uuid)),
  })
);

export default connection(dropTarget(List));
