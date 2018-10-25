import StringFieldDefinition from '../StringFieldDefinition';
import TextWidget from './TextWidget';
import { Field } from '../../store/models';

export interface TextField extends Field {
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
