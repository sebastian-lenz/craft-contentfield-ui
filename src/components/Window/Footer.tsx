import * as React from 'react';
import cx from 'classnames';

export interface Props {
  children: React.ReactNode;
  className?: string;
  flex?: boolean;
}

export default function Footer({ children, className, flex = true }: Props) {
  return (
    <div className={cx('tcfWindow--footer', className, { flex })}>
      {children}
    </div>
  );
}
