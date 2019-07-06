import * as React from 'react';

export const Context = React.createContext<number>(0);

export interface Props {
  children?: React.ReactNode;
}

export default function InstanceDepthProvider({ children }: Props) {
  const depth = React.useContext(Context);

  return <Context.Provider value={depth + 1}>{children}</Context.Provider>;
}
