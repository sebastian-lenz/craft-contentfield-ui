import * as React from 'react';

import Display from './Display';
import Input from './Input';

export interface Props {
  disabled?: boolean;
  elementSiteId: number | null;
  options: Craft.RedactorInputOptions;
  onUpdate: (value: string) => void;
  value: string;
}

export default function Redactor(props: Props) {
  return props.disabled ? <Display {...props} /> : <Input {...props} />;
}
