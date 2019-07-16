import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  outline?: boolean;
  secondary?: boolean;
}

export default function ButtonFlat({
  children,
  className,
  outline,
  secondary,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={cx('tcfButtonFlat', className, { outline, secondary })}
    >
      {children}
    </div>
  );
}
