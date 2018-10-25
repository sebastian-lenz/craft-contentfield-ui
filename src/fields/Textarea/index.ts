import StringFieldDefinition from '../StringFieldDefinition';
import TextareaWidget from './TextareaWidget';
import { Field } from '../../store/models';

export interface TextareaField extends Field {
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
