import * as React from 'react';

export interface Props {
  children: React.ReactNode;
  label: string;
}

export default function FieldPanel({ children, label }: Props) {
  return (
    <div className="field">
      <div className="heading">
        <label>{label}</label>
      </div>
      <div className="input ltr">{children}</div>
    </div>
  );
}
