import BooleanFieldDefinition, {
  BooleanField,
} from '../BooleanFieldDefinition';
import CheckboxWidget from './CheckboxWidget';

export interface CheckboxField extends BooleanField {
  type: 'checkbox';
}

export default class CheckboxFieldDefinition extends BooleanFieldDefinition<
  CheckboxField
> {
  constructor() {
    super({
      widget: CheckboxWidget,
    });

    this.isAlwaysCompact = true;
  }
}
