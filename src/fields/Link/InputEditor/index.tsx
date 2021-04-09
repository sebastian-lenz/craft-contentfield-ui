import * as React from 'react';

import Input from '../../../components/Input';
import { Link, InputLinkType } from '../Link';

export interface Props {
  disabled?: boolean;
  link: Link;
  linkType: InputLinkType;
  onUpdate: (value: any) => void;
}

export default function InputEditor({
  disabled,
  link,
  linkType,
  onUpdate,
}: Props) {
  return (
    <div className="tcfLinkWidget--editor">
      <Input
        disabled={disabled}
        type={linkType.inputType}
        value={link.url}
        onChange={event =>
          onUpdate({ ...link, url: event.currentTarget.value })
        }
      />
    </div>
  );
}
