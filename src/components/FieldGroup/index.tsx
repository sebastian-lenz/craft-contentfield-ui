import * as React from 'react';

export interface Props {
  children: React.ReactNode;
  label?: string;
}

export const toolbarGroup = 'toolbar';

export default function FieldGroup({ children, label }: Props) {
  if (!label || label === '') {
    return <>{children}</>;
  }

  if (label === toolbarGroup) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
}
