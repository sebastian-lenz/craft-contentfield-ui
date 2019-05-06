import ArrayPreview from './ArrayPreview';
import ArrayWidget from './ArrayWidget';
import fields, { AnyField } from '../index';
import { Field } from '../../store/models';

import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
  CloneOptions,
} from '../FieldDefinition';

export interface ArrayField extends Field {
  collapsible: boolean;
  limit: number;
  member: AnyField;
  type: 'array';
}

export type ArrayPreviewOptions = PreviewOptions<ArrayField, Array<any>>;

export default class ArrayFieldType extends FieldDefinition<
  ArrayField,
  Array<any>
> {
  constructor() {
    super({
      widget: ArrayWidget,
    });
  }

  async cloneValue(options: CloneOptions<ArrayField>): Promise<Array<any>> {
    const { field, value, ...syncOptions } = options;

    if (this.isValue(field, value)) {
      const memberDefinition = fields.getDefinition(field.member.type);
      const result: Array<any> = [];

      for (const member of value) {
        result.push(
          await memberDefinition.cloneValue({
            ...syncOptions,
            field: field.member,
            value: member,
          })
        );
      }

      return result;
    } else {
      return this.createValue(options);
    }
  }

  createValue(options: CreateOptions<ArrayField>): Array<any> {
    return [];
  }

  isValue(field: ArrayField, value: any): value is Array<any> {
    return Array.isArray(value);
  }

  preview(options: ArrayPreviewOptions): PreviewResult {
    return new ArrayPreview(options);
  }
}
