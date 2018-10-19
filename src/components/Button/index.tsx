import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  onClick: () => void;
  secondary?: boolean;
}

export default function Button({ children, onClick, secondary }: Props) {
  return (
    <div
      className={cx('tcfButton btn', { secondary })}
      onClick={event => {
        event.preventDefault();
        onClick();
      }}
    >
      {children}
    </div>
  );
}
