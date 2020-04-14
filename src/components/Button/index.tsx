import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (event: React.SyntheticEvent) => void;
  primary?: boolean;
  secondary?: boolean;
}

export default function Button({
  children,
  disabled,
  onClick,
  primary,
  secondary,
}: Props) {
  return (
    <div
      className={cx('tcfButton btn', { disabled, submit: primary, secondary })}
      onClick={(event) => {
        event.preventDefault();
        if (!disabled) onClick(event);
      }}
    >
      {children}
    </div>
  );
}
