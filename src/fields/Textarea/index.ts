import StringFieldDefinition, { BaseTextField } from '../StringFieldDefinition';
import TextareaWidget from './TextareaWidget';

export interface TextareaField extends BaseTextField {
  type: 'textarea';
}

export default class TextareaFieldDefinition extends StringFieldDefinition<
  TextareaField
> {
  constructor() {
    super({
      widget: TextareaWidget,
    });
  }
}
