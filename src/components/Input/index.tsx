import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
  return <input className={cx('tcfInput', className)} {...props} />;
}
