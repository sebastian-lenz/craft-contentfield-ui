import RedactorPreview from './RedactorPreview';
import RedactorWidget from './RedactorWidget';
import StringFieldDefinition, { BaseTextField } from '../StringFieldDefinition';
import { PreviewResult, PreviewOptions } from '../FieldDefinition';

export interface RedactorField extends BaseTextField {
  redactor?: Craft.RedactorInputOptions;
  type: 'redactor';
}

export default class RedactorFieldType extends StringFieldDefinition<
  RedactorField
> {
  constructor() {
    super({
      widget: RedactorWidget,
    });
  }

  preview({ value }: PreviewOptions<RedactorField, string>): PreviewResult {
    return new RedactorPreview(value);
  }
}
