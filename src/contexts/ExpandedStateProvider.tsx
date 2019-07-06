import * as React from 'react';

export interface ExpandedState {
  expanded: Array<string>;
  isExpanded: (uuid: string) => boolean;
  toggleExpanded: (uuid: string, value?: boolean) => void;
}

export interface Props {
  children?: React.ReactNode;
}

export const Context = React.createContext<ExpandedState>({
  expanded: [],
  isExpanded: () => false,
  toggleExpanded: function() {},
});

export default function ExpandedStateProvider({ children }: Props) {
  const [expanded, setExpanded] = React.useState<Array<string>>([]);

  const isExpanded = (uuid: string) => {
    return expanded.indexOf(uuid) !== -1;
  };

  const toggleExpanded = (uuid: string, value?: boolean) => {
    let newExpanded = [...expanded];
    if (value === undefined) {
      value = expanded.indexOf(uuid) === -1;
    }

    if (value) {
      newExpanded.push(uuid);
    } else {
      newExpanded = newExpanded.filter(value => value !== uuid);
    }

    setExpanded(newExpanded);
  };

  return (
    <Context.Provider value={{ expanded, isExpanded, toggleExpanded }}>
      {children}
    </Context.Provider>
  );
}
