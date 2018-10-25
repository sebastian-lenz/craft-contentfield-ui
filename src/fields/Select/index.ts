import EnumFieldDefinition, { EnumField } from '../EnumFieldDefinition';
import SelectWidget from './SelectWidget';

export interface SelectField extends EnumField {
  type: 'select';
}

export default class SelectFieldDefinition extends EnumFieldDefinition<
  SelectField
> {
  constructor() {
    super({
      widget: SelectWidget,
    });
  }
}
