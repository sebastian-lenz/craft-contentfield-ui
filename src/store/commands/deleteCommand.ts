import translate from '../utils/translate';
import uuidRemove from '../actions/uuidRemove';
import { CommandFactoryOptions, Command, CommandGroup } from './index';

export default function deleteCommand({
  owner,
  location: { uuid },
}: CommandFactoryOptions): Command | null {
  if (!owner || owner.field.type !== 'array') {
    return null;
  }

  return {
    group: CommandGroup.Manipulation,
    icon: 'material:delete',
    id: 'delete',
    invoke: dispatch => {
      dispatch(uuidRemove(uuid));
    },
    label: translate('COMMAND_DELETE_LABEL'),
  };
}
