import * as React from 'react';
import cx from 'classnames';

import { Accordion } from '../Accordion';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  isBorderless?: boolean;
  label?: string;
  style?: React.CSSProperties;
  type?: string;
}

export default function FieldGroup({
  children,
  isBorderless,
  label,
  style,
  type,
}: Props) {
  if (type === 'accordion') {
    return <Accordion label={label || 'Details'}>{children}</Accordion>;
  } else if (type === 'panel') {
    return (
      <div className="tcfFieldGroup shadowed" style={style}>
        <div className="tcfFieldGroup--content">{children}</div>
      </div>
    );
  } else if (
    !label ||
    label === '' ||
    label === 'toolbar' ||
    label === 'default'
  ) {
    return (
      <div
        className={cx('tcfFieldGroup--content', { isBorderless })}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="tcfFieldGroup shadowed" style={style}>
      <div className="tcfFieldGroup--label">{label}</div>
      <div className="tcfFieldGroup--content">{children}</div>
    </div>
  );
}
