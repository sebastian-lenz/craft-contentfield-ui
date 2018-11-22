import fetchTranslation from '../store/utils/fetchTranslation';
import { Field as BaseField } from '../store/models';

import FieldDefinition, {
  PreviewOptions,
  CreateOptions,
  CloneOptions,
} from './FieldDefinition';

export interface BaseTextField extends BaseField {
  translatable?: boolean;
}

export default abstract class StringFieldDefinition<
  Field extends BaseTextField
> extends FieldDefinition<Field, string> {
  async cloneValue(options: CloneOptions<Field>): Promise<string> {
    const { field, translate, value } = options;
    if (this.isValue(field, value)) {
      if (field.translatable && translate) {
        return fetchTranslation(value, translate);
      } else {
        return value;
      }
    } else {
      return '';
    }
  }

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
