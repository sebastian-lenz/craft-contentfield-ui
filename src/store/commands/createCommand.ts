import translate from '../utils/translate';
import { Command, CommandGroup, CommandFactoryOptions } from './index';

export default function createCommand({
  owner,
}: CommandFactoryOptions): Command | null {
  return null;

  if (!owner || owner.field.type !== 'array') {
    return null;
  }

  return {
    group: CommandGroup.Manipulation,
    icon: 'material:add',
    id: 'create',
    invoke: () => {},
    label: translate('COMMAND_CREATE_LABEL'),
  };
}
