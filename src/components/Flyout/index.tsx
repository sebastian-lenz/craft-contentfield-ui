import * as React from 'react';
import cx from 'classnames';

import './index.styl';
import Overlay from '../Overlay';

export interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default class Flyout extends React.Component<Props> {
  handle: HTMLDivElement | null = null;
  handleStyle: React.CSSProperties = {
    left: '0px',
  };
  origin: HTMLDivElement | null = null;
  panel: HTMLDivElement | null = null;
  panelClassName: string = 'tcfFlyout--panel';
  panelStyle: React.CSSProperties = {
    left: '0px',
    top: '0px',
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.update();
  };

  render() {
    const { children, onClick } = this.props;
    return (
      <div className="tcfFlyout" ref={this.setOrigin}>
        <Overlay onClick={onClick}>
          <div
            className={this.panelClassName}
            ref={this.setPanel}
            style={{ ...this.panelStyle }}
          >
            <div
              className="tcfFlyout--handle"
              ref={this.setHandle}
              style={{ ...this.handleStyle }}
            />
            {children}
          </div>
        </Overlay>
      </div>
    );
  }

  setHandle = (handle: HTMLDivElement | null) => {
    this.handle = handle;
    this.update();
  };

  setOrigin = (origin: HTMLDivElement | null) => {
    this.origin = origin;
    this.update();
  };

  setPanel = (panel: HTMLDivElement | null) => {
    this.panel = panel;
    this.update();
  };

  update() {
    const { handle, handleStyle, origin, panel, panelStyle } = this;
    if (!origin || !panel || !handle) return;

    const originRect = origin.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    let className = 'tcfFlyout--panel';

    const panelLeft = Math.max(
      10,
      Math.min(
        window.innerWidth - panelRect.width - 10,
        originRect.left + (originRect.width - panelRect.width) * 0.5
      )
    );

    const handleLeft = Math.max(
      10,
      Math.min(
        panelRect.width - 10,
        originRect.left + originRect.width * 0.5 - panelLeft
      )
    );

    handleStyle.left = `${handleLeft}px`;
    panelStyle.left = `${panelLeft}px`;

    if (originRect.top + originRect.height * 0.5 > window.innerHeight * 0.5) {
      className += ' above';
      panelStyle.top = `${originRect.top - panelRect.height - 5}px`;
    } else {
      className += ' below';
      panelStyle.top = `${originRect.top + originRect.height + 5}px`;
    }

    handle.style.left = handleStyle.left;
    panel.className = this.panelClassName = className;
    panel.style.left = panelStyle.left;
    panel.style.top = panelStyle.top;
  }
}
