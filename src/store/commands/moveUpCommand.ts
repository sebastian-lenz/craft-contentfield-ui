import translate from '../utils/translate';
import { CommandFactoryOptions, Command, CommandGroup } from './index';
import uuidOrder from '../actions/uuidOrder';

export default function moveUpCommand({
  location: { uuid },
  owner,
}: CommandFactoryOptions): Command | null {
  if (!owner || owner.field.type !== 'array') {
    return null;
  }

  const list = owner.owner[owner.field.name];
  if (!Array.isArray(list) || owner.index === undefined || owner.index <= 0) {
    return null;
  }

  return {
    group: CommandGroup.Movement,
    icon: 'material:arrow_upward',
    id: 'moveUp',
    invoke: dispatch => dispatch(uuidOrder(uuid, 'up')),
    label: translate('Move up'),
  };
}
