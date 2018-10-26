import * as React from 'react';

import { withColorContext, InjectedColorProps } from '../ColorContext';

import './index.styl';

export type Props = InjectedColorProps & {};

export interface State {
  initialHue: number;
  isMouseDown: boolean;
  mouseX: number;
  mouseY: number;
}

export class Saturation extends React.Component<Props, State> {
  element: HTMLDivElement | null = null;
  state: State = {
    initialHue: 0,
    isMouseDown: false,
    mouseX: 0,
    mouseY: 0,
  };

  componentWillUnmount() {
    this.stopListening();
  }

  handleMouseDown = (event: React.MouseEvent) => {
    const { hsv } = this.props;

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
      ...this.update(event.clientX, event.clientY, hsv.hue),
      initialHue: hsv.hue,
      isMouseDown: true,
    });
  };

  handleMouseMove = (event: MouseEvent) => {
    this.setState(this.update(event.clientX, event.clientY));
  };

  handleMouseUp = (event: MouseEvent) => {
    this.stopListening();
    this.setState({
      ...this.update(event.clientX, event.clientY),
      isMouseDown: false,
    });
  };

  render() {
    const { hsv } = this.props;
    const { initialHue, isMouseDown, mouseX, mouseY } = this.state;

    return (
      <div
        className="tcfColorInputSaturation"
        onMouseDown={this.handleMouseDown}
        ref={this.setElement}
        style={{
          background: `hsl(${(isMouseDown ? initialHue : hsv.hue) *
            360}, 100%, 50%)`,
        }}
      >
        <div
          className="tcfColorInputSaturation--value"
          style={{
            left: `${(isMouseDown ? mouseX : hsv.saturation) * 100}%`,
            top: `${(isMouseDown ? mouseY : 1 - hsv.value) * 100}%`,
          }}
        />
      </div>
    );
  }

  setElement = (element: HTMLDivElement | null) => {
    this.element = element;
  };

  stopListening() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  update(x: number, y: number, initialHue: number = this.state.initialHue) {
    const { element } = this;
    if (!element) {
      return {
        mouseX: this.state.mouseX,
        mouseY: this.state.mouseY,
      };
    }

    const { hsv, onHsvColor } = this.props;
    const rect = element.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    const mouseY = Math.max(0, Math.min(1, (y - rect.top) / rect.height));

    onHsvColor({
      alpha: hsv.alpha,
      hue: initialHue,
      saturation: mouseX,
      value: 1 - mouseY,
    });

    return { mouseX, mouseY };
  }
}

export default withColorContext<{}>(Saturation);
