import StringFieldDefinition, { BaseTextField } from '../StringFieldDefinition';
import TextareaWidget from './TextareaWidget';

export interface TextareaField extends BaseTextField {
  monospace: boolean;
  placeholder?: string;
  rows: number;
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
