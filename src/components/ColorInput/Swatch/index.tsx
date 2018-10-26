import * as React from 'react';
import cx from 'classnames';

import { withColorContext, InjectedColorProps } from '../ColorContext';

import './index.styl';

export type Props = InjectedColorProps & {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Swatch({ children, className, css, onClick }: Props) {
  return (
    <div className={cx('tcfColorInputSwatch', className)} onClick={onClick}>
      <div className="tcfColorInputSwatch--color" style={{ background: css }} />
      {children}
    </div>
  );
}

export default withColorContext(Swatch);
