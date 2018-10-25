import { Field as BaseField } from '../store/models';

import FieldDefinition, {
  PreviewOptions,
  CreateOptions,
} from './FieldDefinition';

export default abstract class StringFieldDefinition<
  Field extends BaseField
> extends FieldDefinition<Field, string> {
  createValue(options: CreateOptions<Field>): string {
    return '';
  }

  isValue(field: Field, value: any): value is string {
    return typeof value === 'string';
  }

  preview({ value }: PreviewOptions<Field, string>): any {
    return value;
  }
}
