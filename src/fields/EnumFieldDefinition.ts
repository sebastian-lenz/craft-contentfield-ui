import { Field as BaseField } from '../store/models';

import FieldDefinition, {
  PreviewOptions,
  CreateOptions,
  PreviewResult,
} from './FieldDefinition';

export type EnumKey = number | string;

export interface EnumOption {
  key: EnumKey;
  label: string;
}

export interface EnumField extends BaseField {
  options: Array<EnumOption>;
}

export default abstract class EnumFieldDefinition<
  Field extends EnumField
> extends FieldDefinition<Field, EnumKey> {
  createValue({ field }: CreateOptions<Field>): EnumKey {
    return field.options[0].key;
  }

  isValue(field: Field, value: any): value is EnumKey {
    return field.options.some(option => option.key === value);
  }

  preview({ field, value }: PreviewOptions<Field, EnumKey>): PreviewResult {
    const option = field
      ? field.options.find(option => option.key === value)
      : undefined;
    return option ? option.label : '-';
  }
}
