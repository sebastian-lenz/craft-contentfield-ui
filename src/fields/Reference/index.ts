import ReferencePreview from './ReferencePreview';
import ReferenceWidget from './ReferenceWidget';
import { Field, ReferenceValue } from '../../store/models';

import { isReferenceValue } from '../../components/ElementSelect/utils';
import FieldDefinition, {
  PreviewResult,
  PreviewOptions,
  CreateOptions,
} from '../FieldDefinition';

export interface ReferenceField extends Field {
  allowSelfReference?: boolean;
  condition: any;
  criteria: Craft.BaseElementSelectCriteria | null;
  elementType: string;
  limit?: number | null;
  modalStorageKey?: string | null;
  referenceElementId: number | null;
  referenceElementSiteId: number | null;
  showSiteMenu?: boolean | string;
  sources?: string[] | null;
  type: 'reference';
  viewMode: 'cards' | 'large' | 'list';
}

export type ReferencePreviewOptions = PreviewOptions<
  ReferenceField,
  Array<ReferenceValue>
>;

export default class ReferenceFieldType extends FieldDefinition<
  ReferenceField,
  Array<ReferenceValue>
> {
  constructor() {
    super({
      widget: ReferenceWidget,
    });
  }

  createValue(options: CreateOptions<ReferenceField>): Array<ReferenceValue> {
    return [];
  }

  isValue(field: ReferenceField, value: any): value is Array<ReferenceValue> {
    return Array.isArray(value) && value.every(isReferenceValue);
  }

  preview(options: ReferencePreviewOptions): PreviewResult {
    return new ReferencePreview(options);
  }
}
