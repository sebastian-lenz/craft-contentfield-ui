import translate from '../utils/translate';
import { Command, CommandGroup, CommandFactoryOptions } from './index';
import { setOverlay } from '../actions';

export default function createCommand({
  location: { uuid },
  owner,
}: CommandFactoryOptions): Command | null {
  if (!owner || owner.field.type !== 'array') {
    return null;
  }

  return {
    group: CommandGroup.Manipulation,
    icon: 'material:add',
    id: 'create',
    invoke: (dispatch, isPreview = false) => {
      dispatch(
        setOverlay({
          afterCreate: isPreview ? 'layer' : 'expand',
          type: 'create',
          uuid,
        })
      );
    },
    label: translate('Create'),
  };
}
