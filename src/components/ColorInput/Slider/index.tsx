import * as React from 'react';

import { withColorContext, InjectedColorProps } from '../ColorContext';

import './index.styl';

export type Props = InjectedColorProps & {
  type: 'alpha' | 'hue';
};

export class Slider extends React.Component<Props> {
  element: HTMLDivElement | null = null;

  componentWillUnmount() {
    this.stopListening();
  }

  handleMouseDown = (event: React.MouseEvent) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.update(event.clientX);
  };

  handleMouseMove = (event: MouseEvent) => {
    this.update(event.clientX);
  };

  handleMouseUp = (event: MouseEvent) => {
    this.stopListening();
    this.update(event.clientX);
  };

  render() {
    const { rgb, hsv, type } = this.props;
    const value = hsv[type];

    let gradient: React.ReactNode;
    if (type === 'alpha') {
      const { red, green, blue } = rgb;
      const colorA = `rgba(${red}, ${green}, ${blue}, 0)`;
      const colorB = `rgba(${red}, ${green}, ${blue}, 1)`;

      gradient = (
        <div
          className="tcfColorInputSlider--gradient"
          style={{
            background: `linear-gradient(to right, ${colorA}, ${colorB})`,
          }}
        />
      );
    }

    return (
      <div
        className={`tcfColorInputSlider ${type}`}
        onMouseDown={this.handleMouseDown}
      >
        {gradient}
        <div className="tcfColorInputSlider--track" ref={this.setElement}>
          <div
            className="tcfColorInputSlider--handle"
            style={{ left: `${value * 100}%` }}
          />
        </div>
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

  update(x: number) {
    const { element } = this;
    if (!element) return;

    const { hsv, onHsvColor, type } = this.props;
    const rect = element.getBoundingClientRect();
    const value = Math.max(0, Math.min(1, (x - rect.left) / rect.width));

    onHsvColor({
      ...hsv,
      [type]: value,
    });
  }
}

export default withColorContext(Slider);
