import * as React from 'react';

import Icon from '../../../components/Icon';
import { Command } from '../../../store/commands';

export interface Props {
  command: Command;
  onClick: () => void;
}

export default function MoreItem({ command, onClick }: Props) {
  return (
    <div className="tcfArrayWidgetMember--headerMoreItem" onClick={onClick}>
      <Icon
        className="tcfArrayWidgetMember--headerMoreItemIcon"
        name={command.icon}
      />
      <span className="tcfArrayWidgetMember--headerMoreItemLabel">
        {command.label}
      </span>
    </div>
  );
}
