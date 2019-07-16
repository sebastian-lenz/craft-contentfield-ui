import translate from '../utils/translate';
import { CommandFactoryOptions, Command, CommandGroup } from './index';
import { setOverlay } from '../actions';

export default function editCommand({
  location: { uuid },
}: CommandFactoryOptions): Command | null {
  return {
    group: CommandGroup.Manipulation,
    icon: 'material:edit',
    id: 'edit',
    invoke: dispatch => {
      dispatch(setOverlay({ type: 'edit', uuid }));
    },
    label: translate('Edit'),
  };
}
