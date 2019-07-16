import translate from '../utils/translate';
import { CommandFactoryOptions, Command, CommandGroup } from './index';

export default function pasteCommand({
  owner,
}: CommandFactoryOptions): Command | null {
  return null;

  if (!owner || owner.field.type !== 'array') {
    return null;
  }

  const list = owner.owner[owner.field.name];
  if (!Array.isArray(list) || owner.index === undefined || owner.index <= 0) {
    return null;
  }

  return {
    group: CommandGroup.Clipboard,
    icon: 'material:content_paste',
    id: 'paste',
    invoke: () => {},
    label: translate('Paste'),
  };
}
