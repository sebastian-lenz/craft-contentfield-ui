import { Field } from '../store/models';

import FieldDefinition, {
  PreviewOptions,
  CreateOptions,
  CloneOptions,
} from './FieldDefinition';

export interface NumericField extends Field {
  defaultValue: number;
  dataType: 'double' | 'integer';
  max?: number;
  min?: number;
}

export default abstract class NumericFieldDefinition<
  Field extends NumericField
> extends FieldDefinition<Field, number> {
  async cloneValue(options: CloneOptions<Field>): Promise<number> {
    const { field, schemas, value } = options;

    return this.isValue(field, value)
      ? value
      : this.createValue({ field, schemas });
  }

  createValue({ field }: CreateOptions<Field>): number {
    return field.defaultValue;
  }

  isValue(field: Field, value: any): value is number {
    return typeof value === 'number' || value instanceof Number;
  }

  preview({ value }: PreviewOptions<Field, number>): any {
    return value;
  }
}
