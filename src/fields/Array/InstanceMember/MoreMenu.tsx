import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import MoreItem from './MoreItem';
import resolveCommands from '../../../store/utils/resolveCommands';
import { Command, CommandGroup } from '../../../store/commands';
import { RootState } from '../../../store/models';

export interface ExternalProps {
  onClose: () => void;
  uuid: string;
}

export interface Props extends ExternalProps {
  commands: Array<Command>;
  dispatch: Dispatch;
}

export function MoreMenu({ commands, dispatch, onClose }: Props) {
  const items: Array<JSX.Element> = [];
  let group: CommandGroup | undefined;

  for (const command of commands) {
    if (command.id === 'edit') {
      continue;
    }

    if (group !== undefined && group !== command.group) {
      items.push(
        <div
          className="tcfArrayWidgetMember--headerMoreDivider"
          key={`${command.id}-divider`}
        />
      );
    }

    group = command.group;
    items.push(
      <MoreItem
        command={command}
        key={command.id}
        onClick={() => {
          onClose();
          command.invoke(dispatch);
        }}
      />
    );
  }

  return <div className="tcfArrayWidgetMember--headerMoreMenu">{items}</div>;
}

export default connect(
  (state: RootState, { uuid }: ExternalProps) => ({
    commands: resolveCommands(state, uuid),
  }),
  (dispatch) => ({ dispatch })
)(MoreMenu);
