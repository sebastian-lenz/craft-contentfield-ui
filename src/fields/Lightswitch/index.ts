import BooleanFieldDefinition, {
  BooleanField,
} from '../BooleanFieldDefinition';
import LightswitchWidget from './LightswitchWidget';

export interface LightswitchField extends BooleanField {
  type: 'lightswitch';
}

export default class LightswitchFieldDefinition extends BooleanFieldDefinition<
  LightswitchField
> {
  constructor() {
    super({
      widget: LightswitchWidget,
    });
  }
}
