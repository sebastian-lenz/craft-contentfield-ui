import * as React from 'react';

import './index.styl';

export interface Props {
  children: React.ReactNode;
}

function Window({ children }: Props) {
  return <div className="tcfWindow">{children}</div>;
}

namespace Window {
  export function Content({ children }: Props) {
    return <div className="tcfWindow--content">{children}</div>;
  }

  export function Footer({ children }: Props) {
    return <div className="tcfWindow--footer">{children}</div>;
  }
}

export default Window;
