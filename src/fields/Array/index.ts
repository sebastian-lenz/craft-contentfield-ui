import ArrayPreview from './ArrayPreview';
import ArrayWidget from './ArrayWidget';
import { AnyField } from '../index';
import { Field } from '../../store/models';

import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
} from '../FieldDefinition';

export interface ArrayField extends Field {
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
