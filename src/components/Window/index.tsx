import * as React from 'react';
import cx from 'classnames';

import ContentComponent from './Content';
import FooterComponent from './Footer';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  className?: string;
  width?: number;
}

function Window({ children, className, width }: Props) {
  return (
    <div className={cx('tcfWindow', className)} style={{ width }}>
      {children}
    </div>
  );
}

namespace Window {
  export const Content = ContentComponent;
  export const Footer = FooterComponent;
}

export default Window;
