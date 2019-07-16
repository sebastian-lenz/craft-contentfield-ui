import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  secondary?: boolean;
}

export default function Button({
  children,
  onClick,
  primary,
  secondary,
}: Props) {
  return (
    <div
      className={cx('tcfButton btn', { submit: primary, secondary })}
      onClick={event => {
        event.preventDefault();
        onClick();
      }}
    >
      {children}
    </div>
  );
}
