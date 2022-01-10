import ReferencePreview from './ReferencePreview';
import ReferenceWidget from './ReferenceWidget';
import { Field } from '../../store/models';

import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
} from '../FieldDefinition';

export interface ReferenceField extends Field {
  allowSelfReference?: boolean;
  criteria: Craft.BaseElementSelectCriteria | null;
  elementType: string;
  limit?: number | null;
  modalStorageKey?: string | null;
  sources?: string[] | null;
  type: 'reference';
  viewMode: 'large' | 'small';
}

export type ReferencePreviewOptions = PreviewOptions<
  ReferenceField,
  Array<number>
>;

export default class ReferenceFieldType extends FieldDefinition<
  ReferenceField,
  Array<number>
> {
  constructor() {
    super({
      widget: ReferenceWidget,
    });
  }

  createValue(options: CreateOptions<ReferenceField>): Array<number> {
    return [];
  }

  isValue(field: ReferenceField, value: any): value is Array<number> {
    return (
      Array.isArray(value) && value.every((value) => typeof value === 'number')
    );
  }

  preview(options: ReferencePreviewOptions): PreviewResult {
    return new ReferencePreview(options);
  }
}
