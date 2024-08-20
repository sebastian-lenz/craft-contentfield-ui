import CKEditorPreview from './CKEditorPreview';
import CKEditorWidget from './CKEditorWidget';
import StringFieldDefinition, { BaseTextField } from '../StringFieldDefinition';
import { PreviewResult, PreviewOptions } from '../FieldDefinition';

export interface CKEditorField extends BaseTextField {
  configId: string;
  editorClass?: string;
  showWordCount?: boolean;
  type: 'ckeditor';
}

export default class CKEditorFieldType extends StringFieldDefinition<CKEditorField> {
  constructor() {
    super({
      widget: CKEditorWidget,
    });
  }

  preview({ value }: PreviewOptions<CKEditorField, string>): PreviewResult {
    return new CKEditorPreview(value);
  }
}
