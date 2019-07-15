import * as React from 'react';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  width?: number;
}

function Window({ children, width }: Props) {
  return (
    <div className="tcfWindow" style={{ width }}>
      {children}
    </div>
  );
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
