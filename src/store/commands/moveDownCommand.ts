import translate from '../utils/translate';
import { CommandFactoryOptions, Command, CommandGroup } from './index';
import uuidOrder from '../actions/uuidOrder';

export default function moveDownCommand({
  location: { uuid },
  owner,
}: CommandFactoryOptions): Command | null {
  if (!owner || owner.field.type !== 'array') {
    return null;
  }

  const list = owner.owner[owner.field.name];
  if (
    !Array.isArray(list) ||
    owner.index === undefined ||
    owner.index >= list.length - 1
  ) {
    return null;
  }

  return {
    group: CommandGroup.Movement,
    icon: 'material:arrow_downward',
    id: 'moveDown',
    invoke: dispatch => dispatch(uuidOrder(uuid, 'down')),
    label: translate('Move down'),
  };
}
