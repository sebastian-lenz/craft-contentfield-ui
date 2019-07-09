import * as React from 'react';
import cx from 'classnames';

import uuid from '../../store/utils/uuid';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  value: boolean;
}

export default class Checkbox extends React.Component<Props> {
  id: string = uuid();

  render() {
    const { id } = this;
    const { className, children, disabled, onChange, value } = this.props;

    return (
      <dl className={cx('tcfCheckbox', className)}>
        <dd className="tcfCheckbox--input">
          <input
            checked={value}
            disabled={disabled}
            id={id}
            onChange={disabled ? undefined : () => onChange(!value)}
            type="checkbox"
          />
        </dd>
        <dt className="tcfCheckbox--label">
          <label htmlFor={id}>{children}</label>
        </dt>
      </dl>
    );
  }
}
