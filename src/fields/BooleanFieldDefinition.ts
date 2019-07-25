import { Field as BaseField } from '../store/models/schema';

import FieldDefinition, {
  PreviewOptions,
  CreateOptions,
} from './FieldDefinition';

export interface BooleanField extends BaseField {
  defaultValue?: boolean;
}

export default abstract class BooleanFieldDefinition<
  Field extends BooleanField
> extends FieldDefinition<Field, boolean> {
  createValue(options: CreateOptions<Field>): boolean {
    return !!options.field.defaultValue;
  }

  isValue(field: Field, value: any): value is boolean {
    return typeof value === 'boolean' || value instanceof Boolean;
  }

  preview({ value }: PreviewOptions<Field, boolean>): any {
    return value;
  }
}
