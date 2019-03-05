import * as React from 'react';

import Input from '../../components/Input';
import { Link, InputLinkType } from './Link';

export interface Props {
  link: Link;
  linkType: InputLinkType;
  onUpdate: (value: any) => void;
}

export default function InputEditor({ link, linkType, onUpdate }: Props) {
  return (
    <Input
      type={linkType.inputType}
      value={link.url}
      onChange={event => onUpdate({ ...link, url: event.currentTarget.value })}
    />
  );
}
