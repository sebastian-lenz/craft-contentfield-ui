import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  className?: string;
  isCompact?: boolean;
  label: string;
  width?: number | string;
}

export default function FieldPanel({
  children,
  className,
  isCompact,
  label,
  width,
}: Props) {
  let style: React.CSSProperties | undefined;
  if (width && width !== 100) {
    style = { width: typeof width === 'string' ? width : `${width}%` };
  }

  if (isCompact) {
    return <>{children}</>;
  }

  return (
    <div className={cx('tcfFieldPanel', className)} style={style}>
      <div className="tcfFieldPanel--label">{label}</div>
      {children}
    </div>
  );
}
