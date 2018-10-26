import * as React from 'react';
import { createPortal } from 'react-dom';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export default class Overlay extends React.Component<Props> {
  element: HTMLElement | null = null;

  constructor(props: Props) {
    super(props);

    const element = document.createElement('div');
    element.className = 'tcfOverlay';
    element.addEventListener('mousedown', this.handleMouseDown);
    document.body.appendChild(element);
    this.element = element;
  }

  componentWillUnmount() {
    const { element } = this;
    if (element) {
      document.body.removeChild(element);
      element.removeEventListener('mousedown', this.handleMouseDown);
      this.element = null;
    }
  }

  handleMouseDown = (event: MouseEvent) => {
    const { onClick } = this.props;
    if (event.target === this.element && onClick) {
      onClick();
    }
  };

  render() {
    const { children } = this.props;
    const { element } = this;
    if (!element) {
      return null;
    }

    return createPortal(children, element);
  }
}
