import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  uri: string;
}

export interface State {
  currentChildren: React.ReactNode;
  currentUri: string;
  inTransition: boolean;
  lastChildren: React.ReactNode;
  lastUri: string | null;
}

export interface Snapshot {
  height: number;
}

export default class DetailsPanel extends React.Component<Props, State> {
  element: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentChildren: props.children,
      currentUri: props.uri,
      inTransition: false,
      lastChildren: null,
      lastUri: null,
    };
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: Snapshot | null
  ) {
    const { element } = this;
    if (element && snapshot) {
      setTimeout(() => {
        element.style.height = '';
        const height = element.offsetHeight;
        element.style.height = `${snapshot.height}px`;

        element.getBoundingClientRect();
        element.style.transition = 'height 200ms';
        element.style.height = `${height}px`;
      }, 0);
    }
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State): Snapshot | null {
    const { element } = this;
    if (prevState.currentUri !== this.state.currentUri && element) {
      const height = element.offsetHeight;
      element.style.height = `${height}px`;
      return { height };
    }

    return null;
  }

  handleAnimationEnd = () => {
    const { element } = this;
    if (element) {
      element.style.height = '';
      element.style.transition = '';
    }

    this.setState({
      inTransition: false,
      lastChildren: null,
      lastUri: null,
    });
  };

  render() {
    const { className, itemClassName } = this.props;
    const {
      currentChildren,
      currentUri,
      inTransition,
      lastChildren,
      lastUri,
    } = this.state;

    const items: Array<React.ReactNode> = [];

    if (inTransition && lastUri) {
      items.push(
        <div
          className={cx(itemClassName, 'tcfDetailsPanel--item', 'from')}
          key={lastUri}
        >
          {lastChildren}
        </div>
      );
    }

    items.push(
      <div
        className={cx(itemClassName, 'tcfDetailsPanel--item', {
          to: inTransition,
        })}
        key={currentUri}
        onAnimationEnd={this.handleAnimationEnd}
      >
        {currentChildren}
      </div>
    );

    return (
      <div className={cx(className, 'tcfDetailsPanel')} ref={this.setElement}>
        {items}
      </div>
    );
  }

  setElement = (element: HTMLDivElement | null) => {
    this.element = element;
  };

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    if (props.uri === state.currentUri) {
      return {
        ...state,
        currentChildren: props.children,
      };
    }

    if (props.uri !== state.currentUri && !state.inTransition) {
      return {
        inTransition: true,
        lastChildren: state.currentChildren,
        lastUri: state.currentUri,
        currentChildren: props.children,
        currentUri: props.uri,
      };
    }

    return null;
  }
}
