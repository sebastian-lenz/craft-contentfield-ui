import * as React from 'react';
import cx from 'classnames';

export interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Content({ children, className }: Props) {
  return <div className={cx('tcfWindow--content', className)}>{children}</div>;
}
