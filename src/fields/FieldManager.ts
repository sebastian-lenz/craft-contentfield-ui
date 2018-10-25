import FieldDefinition, { CreateOptions } from './FieldDefinition';
import { AnyField, FieldType } from './index';
import { Field } from '../store/models';
import { FieldTypeMap } from './includes';

export type Definitions = {
  [key in FieldType]: FieldDefinition<FieldTypeMap[key]>
};

export default class FieldManager {
  definitions!: Definitions;

  initialize(definitions: Definitions) {
    this.definitions = definitions;
  }

  createValue<T extends Field>(options: CreateOptions<T>): any {
    return this.getDefinition(options.field as AnyField).createValue(options);
  }

  getDefinition(fieldOrType: AnyField | FieldType): FieldDefinition {
    return this.definitions[
      typeof fieldOrType === 'object' ? fieldOrType.type : fieldOrType
    ] as FieldDefinition;
  }
}
