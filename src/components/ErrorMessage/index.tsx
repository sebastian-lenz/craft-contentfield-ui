import * as React from 'react';
import TextAndIcon from '../TextAndIcon';

export interface Props {
  children?: React.ReactNode;
  title: string;
}

export default function ErrorMessage({ children, title }: Props) {
  return (
    <div className="tcfErrorMessage">
      <TextAndIcon icon="material:error">{title}</TextAndIcon>
      {children}
    </div>
  );
}
