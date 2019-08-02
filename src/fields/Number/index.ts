import NumberWidget from './NumberWidget';
import NumericFieldDefinition, {
  NumericField,
} from '../NumericFieldDefinition';

export interface NumberField extends NumericField {
  placeholder: string;
  type: 'number';
}

export default class NumberFieldDefinition extends NumericFieldDefinition<
  NumberField
> {
  constructor() {
    super({
      widget: NumberWidget,
    });
  }
}
