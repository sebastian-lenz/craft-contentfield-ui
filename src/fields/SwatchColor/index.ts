import EnumFieldDefinition, { EnumField } from '../EnumFieldDefinition';
import SwatchColorWidget from './SwatchColorWidget';

export interface SwatchColorField extends EnumField {
  type: 'swatchcolor';
}

export default class SwatchColorFieldDefinition extends EnumFieldDefinition<
  SwatchColorField
> {
  constructor() {
    super({
      widget: SwatchColorWidget,
    });
  }
}
