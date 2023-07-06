import * as React from 'react';
import cx from 'classnames';

import Icon from '../Icon';

import './index.styl';

export interface Props {
  children: any;
  label: string;
}

export function Accordion({ children, label }: Props) {
  const [isExpanded, setExpanded] = React.useState(false);

  return (
    <div className={cx('tcfFieldGroup tcfAccordion', { isExpanded })}>
      <div
        className="tcfAccordion--label"
        onClick={() => setExpanded(!isExpanded)}
      >
        <Icon
          name={isExpanded ? 'material:expand_less' : 'material:expand_more'}
        />
        <span>{label}</span>
      </div>
      <div className="tcfAccordion--content">
        <div className="tcfFieldGroup--content">{children}</div>
      </div>
    </div>
  );
}
