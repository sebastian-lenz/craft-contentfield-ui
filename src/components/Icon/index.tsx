import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  className?: string;
  name: string;
}

const CRAFT_PREFIX = 'craft:';
const MATERIAL_PREFIX = 'material:';

export default function Icon({ className, name }: Props) {
  let iconType = 'craft';
  if (name.startsWith(MATERIAL_PREFIX)) {
    iconType = 'material';
    name = name.substr(MATERIAL_PREFIX.length);
  } else if (name.startsWith(CRAFT_PREFIX)) {
    name = name.substr(CRAFT_PREFIX.length);
  }

  return <div className={cx('tcfIcon', className, iconType)}>{name}</div>;
}
