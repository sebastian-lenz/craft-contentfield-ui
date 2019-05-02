import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  isCompact?: boolean;
  label?: string;
  style?: React.CSSProperties;
}

export const toolbarGroup = 'toolbar';

export default function FieldGroup({
  children,
  isCompact,
  label,
  style,
}: Props) {
  if (!label || label === '' || label === toolbarGroup) {
    return (
      <div
        className={cx('tcfFieldGroup--content', { isCompact })}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="tcfFieldGroup" style={style}>
      <div className="tcfFieldGroup--label">{label}</div>
      <div className="tcfFieldGroup--content">{children}</div>
    </div>
  );
}
