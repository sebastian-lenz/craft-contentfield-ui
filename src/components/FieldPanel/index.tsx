import * as React from 'react';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  label: string;
  width?: number;
}

export default function FieldPanel({ children, label, width }: Props) {
  let style: React.CSSProperties | undefined;
  if (width && width !== 100) {
    style = { width: `${width}%` };
  }

  return (
    <div className="tcfFieldPanel field" style={style}>
      <div className="tcfFieldPanel--label">{label}</div>
      {children}
    </div>
  );
}
