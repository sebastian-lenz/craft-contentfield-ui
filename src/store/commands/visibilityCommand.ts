import translate from '../utils/translate';
import uuidVisibility from '../actions/uuidVisibility';
import { CommandFactoryOptions, Command, CommandGroup } from './index';

export default function visibilityCommand({
  location: {
    uuid,
    model: { __visible },
  },
}: CommandFactoryOptions): Command | null {
  return {
    group: CommandGroup.Visibility,
    icon: __visible ? 'material:visibility_off' : 'material:visibility',
    id: 'visibility',
    invoke: dispatch => {
      dispatch(uuidVisibility(uuid));
    },
    label: translate(__visible ? 'Hide' : 'Show'),
  };
}
