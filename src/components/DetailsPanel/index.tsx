import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  className?: string;
  uri: string;
}

export interface State {
  inTransition: boolean;
  lastChildren: React.ReactNode;
  lastUri: string | null;
  uri: string | null;
}

export interface Snapshot {
  height: number;
}

export default class DetailsPanel extends React.Component<Props, State> {
  element: HTMLDivElement | null = null;
  state: State = {
    inTransition: false,
    lastChildren: null,
    lastUri: null,
    uri: null,
  };

  componentDidUpdate(props: Props, state: State, snapshot: Snapshot | null) {
    const { element } = this;
    if (element && snapshot) {
      const height = element.offsetHeight;
      element.style.height = `${snapshot.height}px`;
      element.getBoundingClientRect();
      element.style.height = `${height}px`;
    }
  }

  getSnapshotBeforeUpdate(props: Props, state: State): Snapshot | null {
    const { element } = this;
    if (!state.inTransition && this.state.inTransition && element) {
      return { height: element.offsetHeight };
    }

    return null;
  }

  handleTransitionEnd = () => {
    const { props } = this;
    this.setState({
      inTransition: false,
      lastChildren: props.children,
      lastUri: props.uri,
    });
  };

  render() {
    const { children, className, uri } = this.props;
    const { inTransition, lastChildren, lastUri } = this.state;

    const items: Array<React.ReactNode> = [
      <div className="tcfDetailsPanel--item" key={uri}>
        {children}
      </div>,
    ];

    if (inTransition && lastUri) {
      items.push(
        <div className={cx('tcfDetailsPanel--item', 'last')} key={lastUri}>
          {lastChildren}
        </div>
      );
    }

    return (
      <div
        className={cx('tcfDetailsPanel', className, { inTransition })}
        onTransitionEnd={this.handleTransitionEnd}
        ref={this.setElement}
      >
        {items}
      </div>
    );
  }

  setElement = (element: HTMLDivElement | null) => {
    this.element = element;
  };

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    if (props.uri !== state.uri && !state.inTransition) {
      return {
        ...state,
        inTransition: true,
        uri: props.uri,
      };
    }

    if (!state.inTransition) {
      return {
        ...state,
        lastChildren: props.children,
      };
    }

    return null;
  }
}
