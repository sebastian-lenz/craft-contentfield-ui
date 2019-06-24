import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

export default function Button({ children, onClick, primary }: Props) {
  return (
    <div
      className={cx('tcfArrayWidgetMember--headerActionsButton', { primary })}
      onClick={event => {
        event.preventDefault();
        onClick();
      }}
    >
      {children}
    </div>
  );
}
