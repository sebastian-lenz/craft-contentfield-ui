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
  optional: boolean;
}

export default abstract class NumericFieldDefinition<
  Field extends NumericField
> extends FieldDefinition<Field, Number | number | null> {
  async cloneValue(
    options: CloneOptions<Field>
  ): Promise<Number | number | null> {
    const { field, schemas, value } = options;

    return this.isValue(field, value)
      ? value
      : this.createValue({ field, schemas });
  }

  createValue({ field }: CreateOptions<Field>): Number | number | null {
    return field.defaultValue;
  }

  isValue({ optional }: Field, value: any): value is Number | number | null {
    if (optional && value === null) {
      return true;
    }

    return typeof value === 'number' || value instanceof Number;
  }

  preview({ value }: PreviewOptions<Field, Number | number | null>): any {
    return value;
  }
}
