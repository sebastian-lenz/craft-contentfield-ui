import translate from '../utils/translate';
import { CommandFactoryOptions, Command, CommandGroup } from './index';

export default function cutCommand({
  owner,
}: CommandFactoryOptions): Command | null {
  return null;

  if (!owner || owner.field.type !== 'array') {
    return null;
  }

  return {
    group: CommandGroup.Clipboard,
    icon: 'material:content_cut',
    id: 'cut',
    invoke: () => {},
    label: translate('COMMAND_CUT_LABEL'),
  };
}
