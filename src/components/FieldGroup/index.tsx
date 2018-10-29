import * as React from 'react';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
}

export const toolbarGroup = 'toolbar';

export default function FieldGroup({ children, label, style }: Props) {
  if (!label || label === '' || label === toolbarGroup) {
    return <div className="tcfFieldGroup--content">{children}</div>;
  }

  return (
    <div style={style}>
      <div>{label}</div>
      <div className="tcfFieldGroup--content">{children}</div>
    </div>
  );
}
