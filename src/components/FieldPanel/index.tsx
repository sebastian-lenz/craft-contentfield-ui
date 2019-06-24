import * as React from 'react';
import cx from 'classnames';

import './index.styl';

export interface Props {
  children: React.ReactNode;
  className?: string;
  errors?: Array<string> | null;
  instructions?: string | null;
  isPlainField?: boolean;
  isRequired?: boolean;
  label: string;
  width?: number | string;
}

export default function FieldPanel({
  children,
  className,
  errors,
  instructions,
  isPlainField,
  isRequired,
  label,
  width,
}: Props) {
  let style: React.CSSProperties | undefined;
  if (width && width !== 100) {
    style = { width: typeof width === 'string' ? width : `${width}%` };
  }

  if (isPlainField) {
    return <>{children}</>;
  }

  const hasErrors = errors && errors.length;

  return (
    <div className={cx('tcfFieldPanel', className)} style={style}>
      <div className={cx('tcfFieldPanel--label', { hasErrors, isRequired })}>
        {label}
      </div>
      {instructions ? (
        <div className="tcfFieldPanel--instructions">{instructions}</div>
      ) : null}
      {errors && errors.length ? (
        <ul className="tcfFieldPanel--errors">
          {errors.map((error, index) => (
            <li className="tcfFieldPanel--error" key={index}>
              {error}
            </li>
          ))}
        </ul>
      ) : null}
      {children}
    </div>
  );
}
