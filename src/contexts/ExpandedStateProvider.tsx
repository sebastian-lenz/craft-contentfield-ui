import * as React from 'react';

export interface ExpandedState {
  expanded: Array<string>;
  isExpanded: (uuid: string) => boolean;
  toggleExpanded: (uuid: string, value?: boolean) => void;
}

export interface Props {
  children?: React.ReactNode;
}

export interface State {
  expanded: Array<string>;
}

export const Context = React.createContext<ExpandedState>({
  expanded: [],
  isExpanded: uuid => false,
  toggleExpanded: function(uuid: string, value?: boolean) {},
});

export default class ExpandedStateProvider extends React.Component<
  Props,
  State
> {
  state: State = {
    expanded: [],
  };

  isExpanded = (uuid: string) => {
    return this.state.expanded.indexOf(uuid) !== -1;
  };

  render() {
    const { isExpanded, toggleExpanded } = this;
    const { expanded } = this.state;
    const { children } = this.props;

    return (
      <Context.Provider value={{ expanded, isExpanded, toggleExpanded }}>
        {children}
      </Context.Provider>
    );
  }

  toggleExpanded = (uuid: string, value?: boolean) => {
    let expanded = [...this.state.expanded];

    if (value === undefined) {
      value = expanded.indexOf(uuid) === -1;
    }

    if (value) {
      expanded.push(uuid);
    } else {
      expanded = expanded.filter(value => value !== uuid);
    }

    this.setState({ expanded });
  };
}
