import translate from '../utils/translate';
import { Command, CommandGroup } from './index';

export default function copyCommand(): Command | null {
  return null;

  return {
    group: CommandGroup.Clipboard,
    icon: 'material:content_copy',
    id: 'copy',
    invoke: () => {},
    label: translate('Copy'),
  };
}
