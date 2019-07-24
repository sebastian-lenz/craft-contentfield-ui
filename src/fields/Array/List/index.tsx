import * as React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd';

import DefaultMember from '../DefaultMember';
import dropTarget from '../utils/dropTarget';
import moveModel, { MoveModelOptions } from '../../../store/actions/moveModel';
import InstanceMember from '../InstanceMember';
import isModel from '../../../store/utils/isModel';
import Text from '../../../components/Text';
import { AnyField } from '../../index';
import { AnyPathSegment } from '../../../store/utils/parsePath';
import { Context } from '../../../contexts/InstanceDepthProvider';
import { PreviewMode } from '../index';
import { RootState, Schemas, Model } from '../../../store/models';

import './index.styl';

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
  data: Array<any>;
  disabled?: boolean;
  field: AnyField;
  isCollapsible: boolean;
  limit: number;
  model: Model;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
  path: Array<AnyPathSegment>;
  previewMode: PreviewMode;
}

export interface DropProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

export interface ReduxProps {
  schemas: Schemas;
  onMove: (options: MoveModelOptions) => void;
}

export type Props = ExternalProps & DropProps & ReduxProps;

export interface State {
  dropIndex: number;
  placeholderHeight: number;
}

export class List extends React.PureComponent<Props, State> {
  context!: React.ContextType<typeof Context>;
  element: HTMLElement | null = null;
  state: State = {
    dropIndex: -1,
    placeholderHeight: 0,
  };

  static contextType = Context;

  getDropIndex(monitor: DropTargetMonitor): number {
    const offset = monitor.getClientOffset();
    const container = this.element;
    const { data } = this.props;
    let dropIndex = data.length;

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
          className={cx('tcfArrayWidgetList--placeholder')}
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

    if (members.length === 0) {
      members.push(
        <div className="tcfArrayWidgetList--empty" key="empty">
          <Text value="Drop elements here" />
        </div>
      );
    }

    return (
      <>
        {connectDropTarget(
          <div className="tcfArrayWidgetList" ref={this.setElement}>
            {members}
          </div>
        )}
        <div className="tcfArrayWidgetList--footer">{children}</div>
      </>
    );
  }

  renderMembers(): Array<React.ReactElement<any>> {
    const {
      data,
      disabled,
      field,
      isCollapsible,
      model,
      onDelete,
      onUpdate,
      path: parentPath,
      previewMode,
      schemas,
    } = this.props;

    const depth = this.context;

    return data.map((child, index) => {
      const path: Array<AnyPathSegment> = [
        ...parentPath,
        { index, name: field.name, type: 'index' },
      ];

      const props = {
        disabled,
        index,
        isCollapsible,
        key: isModel(child) ? child.__uuid : index,
        model,
        onDelete,
        onUpdate,
        path,
      };

      if (isModel(child) && field.type === 'instance') {
        return (
          <InstanceMember
            {...props}
            child={child}
            depth={depth}
            field={field}
            previewMode={previewMode}
            schema={schemas[child.__type]}
          />
        );
      } else {
        return (
          <DefaultMember
            {...props}
            child={child}
            depth={depth}
            field={field}
            previewMode={previewMode}
          />
        );
      }
    });
  }

  setElement = (element: HTMLElement | null) => {
    this.element = element;
  };
}

const connection = connect(
  (state: RootState) => ({
    schemas: state.schemas,
  }),
  dispatch => ({
    onMove: (options: MoveModelOptions) => dispatch(moveModel(options)),
  })
);

export default connection(dropTarget(List));
