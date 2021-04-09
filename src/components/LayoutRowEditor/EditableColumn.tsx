import * as React from 'react';
import cx from 'classnames';

import clamp from '../../utils/clamp';
import { getColumnName } from '../LayoutPreview';
import {
  Column,
  getBreakpointValue,
  LayoutBreakpoint,
  LayoutBreakpointMap,
  LayoutConstraints,
  setBreakpointValue,
} from '../../fields/Layout/Layout';

export interface Props {
  breakpoints: Array<LayoutBreakpoint>;
  column: Column;
  columnsPerRow: number;
  constraints: LayoutConstraints;
  current: LayoutBreakpoint;
  index: number;
  isSelected: boolean;
  onSelect: (uid: string) => void;
  onUpdate: (uid: string, data: Partial<Column>) => void;
}

export interface State {
  dragDelta: number;
  dragMode: 'none' | 'size' | 'move';
}

export default class EditableColumn extends React.Component<Props, State> {
  element: HTMLElement | null = null;
  initialHandle = false;
  initialPosition = 0;
  isListening = false;
  state: State = {
    dragDelta: 0,
    dragMode: 'none',
  };

  applyMove(delta: number) {
    const { props } = this;
    const { column, columnsPerRow, onUpdate } = props;

    const value = clamp(this.sample(column.offset) + delta, 0, columnsPerRow);

    onUpdate(column.__uuid, {
      offset: setBreakpointValue(column.offset, value, props),
    });
  }

  applySize(delta: number) {
    const { props } = this;
    const {
      column,
      constraints: { maxColumnWidth, minColumnWidth },
      onUpdate,
    } = props;

    const value = clamp(
      this.sample(column.width) + delta,
      minColumnWidth,
      maxColumnWidth
    );

    onUpdate(column.__uuid, {
      width: setBreakpointValue(column.width, value, props),
    });
  }

  componentWillUnmount() {
    this.stopListening();
  }

  handleMouseDown = (event: React.MouseEvent) => {
    this.initialHandle = false;
    this.initialPosition = event.clientX;
    this.startListening();

    let target = event.target as HTMLElement | null;
    while (target) {
      if (target.classList.contains('tcfLayoutRowEditor--colHandle')) {
        this.initialHandle = true;
        break;
      }

      target = target.parentElement;
    }
  };

  handleMouseMove = (event: MouseEvent) => {
    const { dragMode } = this.state;
    const delta = event.clientX - this.initialPosition;

    if (dragMode === 'none' && Math.abs(delta) > 3) {
      this.initialPosition = event.clientX;
      this.setState({
        dragDelta: 0,
        dragMode: this.initialHandle ? 'size' : 'move',
      });
    }

    if (dragMode !== 'none') {
      this.setState({ dragDelta: delta, dragMode });
    }
  };

  handleMouseUp = () => {
    const { column, onSelect } = this.props;
    const { dragDelta, dragMode } = this.state;
    const delta = this.toColumns(dragDelta);

    if (dragMode === 'size') {
      this.applySize(delta);
    } else if (dragMode === 'move') {
      this.applyMove(delta);
    } else {
      onSelect(column.__uuid);
    }

    this.stopListening();
    this.setState({
      dragDelta: 0,
      dragMode: 'none',
    });
  };

  render() {
    const { dragDelta, dragMode } = this.state;
    const { column, columnsPerRow, index, isSelected } = this.props;
    const columnOffset = this.sample(column.offset);
    const columnWidth = this.sample(column.width);
    const order = this.sample(column.order);

    let width = `${((columnWidth / columnsPerRow) * 100).toFixed(6)}%`;
    let marginLeft = `${((columnOffset / columnsPerRow) * 100).toFixed(6)}%`;
    if (dragMode === 'move') {
      marginLeft = `calc(${marginLeft} + ${dragDelta}px)`;
    } else if (dragMode === 'size') {
      width = `calc(${width} + ${dragDelta}px)`;
    }

    return (
      <div
        className={cx('tcfLayoutRowEditor--col', { isSelected })}
        onMouseDown={this.handleMouseDown}
        ref={this.setElement}
        style={{ marginLeft, order, width }}
      >
        <div className="tcfLayoutRowEditor--colPanel">
          <div className="tcfLayoutRowEditor--colLabel">
            {getColumnName(index)}
          </div>
          <div className="tcfLayoutRowEditor--colHandle"></div>
        </div>
      </div>
    );
  }

  sample(map: LayoutBreakpointMap) {
    return getBreakpointValue(map, this.props);
  }

  setElement = (element: HTMLElement | null) => {
    this.element = element;
  };

  startListening() {
    if (this.isListening) return;
    this.isListening = true;

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  stopListening() {
    this.isListening = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  toColumns(value: number): number {
    const { element } = this;
    const { columnsPerRow } = this.props;
    const parent = element ? element.parentElement : null;
    if (!parent) return 0;

    const columnWidth = parent.offsetWidth / columnsPerRow;
    return Math.round(value / columnWidth);
  }
}
