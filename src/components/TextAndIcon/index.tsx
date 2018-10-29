import * as React from 'react';
import cx from 'classnames';

import Icon from '../Icon';
import Text from '../Text';

import './index.styl';

export interface Props {
  children: string;
  className?: string;
  icon: string;
}

export default function TextAndIcon({ children, className, icon }: Props) {
  return (
    <div className={cx('tcfTextAndIcon', className)}>
      <Icon className="tcfTextAndIcon--icon" name={icon} />
      <Text className="tcfTextAndIcon--text" value={children} />
    </div>
  );
}
