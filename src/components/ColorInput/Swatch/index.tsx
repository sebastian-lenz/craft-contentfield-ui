import * as React from 'react';
import cx from 'classnames';

import { withColorContext, InjectedColorProps } from '../ColorContext';

import './index.styl';
import { hexToRgb } from '../Color';

export type Props = InjectedColorProps & {
  children?: React.ReactNode;
  color?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function Swatch({
  children,
  className,
  color,
  css,
  disabled,
  onClick,
  onRgbColor,
}: Props) {
  if (color) {
    const rgbColor = hexToRgb(color);
    if (rgbColor) {
      onClick = function() {
        onRgbColor(rgbColor);
      };
    }
  }

  return (
    <div
      className={cx('tcfColorInputSwatch', className)}
      onClick={disabled ? undefined : onClick}
    >
      <div
        className="tcfColorInputSwatch--color"
        style={{ background: color ? color : css }}
      />
      {children}
    </div>
  );
}

export default withColorContext(Swatch);
