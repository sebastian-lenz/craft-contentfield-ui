import * as React from 'react';

import { Props } from './index';

export default function Display({ value }: Props) {
  return (
    <div className="redactor-box redactor-styles-on redactor-toolbar-on focusable-input redactor-focus focus">
      <div
        className="redactor-styles redactor-in redactor-in-0"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
