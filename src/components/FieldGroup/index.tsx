import * as React from 'react';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  label?: string;
}

export const toolbarGroup = 'toolbar';

export default function FieldGroup({ children, label }: Props) {
  if (!label || label === '' || label === toolbarGroup) {
    return <div className="tcfFieldGroup--content">{children}</div>;
  }

  return (
    <div>
      <div>{label}</div>
      <div className="tcfFieldGroup--content">{children}</div>
    </div>
  );
}
