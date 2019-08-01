import StringFieldDefinition, { BaseTextField } from '../StringFieldDefinition';
import TextWidget from './TextWidget';

export interface TextField extends BaseTextField {
  inputType: string;
  placeholder: string;
  type: 'text';
}

export default class TextFieldDefinition extends StringFieldDefinition<
  TextField
> {
  constructor() {
    super({
      widget: TextWidget,
    });
  }
}
